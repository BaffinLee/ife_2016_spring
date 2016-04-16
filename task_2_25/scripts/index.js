// 绑定点击事件
function bindTreeClick () {
	var tree = document.getElementById('tree');
	// 接管整个tree的点击
	tree.addEventListener('click', function (e) {
		// 点击li下的span时
		// 要是li有class，即表示有子树
		// 此时点击事件为展开、关闭子树
		if (e.target 
			&& e.target.parentNode 
			&& e.target.nodeName.toLowerCase() == 'span' 
			&& e.target.parentNode.getAttribute('class')
		   ) {
			// class 为 on ，则点击关闭子树
			if (e.target.parentNode.getAttribute('class').match(/on/)) {
				e.target.parentNode.setAttribute('class', 'tree');
			// 否则展开子树
			} else {
				e.target.parentNode.setAttribute('class', 'tree on');
			}
		}
		// 点击到li上或者li里面的span时，元素标记为选中
		if (e.target 
			&& (e.target.nodeName.toLowerCase() == 'li' 
				|| e.target.nodeName.toLowerCase() == 'span')
		    ) {
			// 区分点击li或span
			node = e.target.nodeName.toLowerCase() == 'span' ? e.target.parentNode : e.target;
			// 如果之前有选中元素，清除样式
			if (window.selectedItem) {
				window.selectedItem.removeAttribute('style');
			}
			// 更换选中元素，设定样式
			node.style.backgroundColor = '#f2f2f2';
			window.selectedItem = node;
		}
	});
}

// 删除元素函数
function deleteFun () {
	// 有选中元素时才处理
	 if (window.selectedItem) {
	 	// 如果移除本元素之后，父元素没有子元素了
	 	// 就先把父元素的 class 清除
	 	// 以显示父元素没有子元素的样式
	 	if (window.selectedItem.parentNode.childElementCount == 1) {
	 		window.selectedItem.parentNode.parentNode.removeAttribute('class');
	 		// 然后才移除元素
	 		window.selectedItem.parentNode.parentNode.removeChild(window.selectedItem.parentNode);
	 		return true;
	 	}
	 	// 否则直接移除元素
	 	window.selectedItem.parentNode.removeChild(window.selectedItem);
	 }
}

// 增加元素函数
function addFun () {
	// 有选中元素时才处理
	if (window.selectedItem) {
		// 如果选中元素有子树，插入到子树里
		if (window.selectedItem.getElementsByTagName('ul').length > 0) {
			var newItem = document.createElement('li');
			var text = document.getElementById('add').value;
			text = text.replace(/^\s+|\s+$/, '');
			// input不为空时才处理
			if (text && window.selectedItem) {
				newItem.innerHTML = "<span>" + text + "</span>";
				window.selectedItem.getElementsByTagName('ul')[0].appendChild(newItem);
			}
		// 否则创建子树，插入到子树里
		} else {
			var newItem = document.createElement('ul');
			var text = document.getElementById('add').value;
			text = text.replace(/^\s+|\s+$/, '');
			// input不为空时才处理
			if (text && window.selectedItem) {
				newItem.innerHTML = "<li><span>" + text + "</span></li>";
				window.selectedItem.setAttribute('class', 'tree on');
				window.selectedItem.appendChild(newItem);
			}
		}
	}
	
}

// 搜索函数
function searchFun (searchWord, node) {
	// 遇到有子树，但是没有展开子树时
	// 展开子树
	if (node.getAttribute('class') == 'tree') {
		node.setAttribute('class', 'tree on');
	}
	// 设置为正在遍历的样式
	node.style.backgroundColor = "#f2f2f2";
	// 要是搜索成功，停下
	// 并且设定元素为选中元素
	// 以便之后其他操作时清除选中样式
	if (node.getElementsByTagName('span')[0].innerText == searchWord) {
		node.getElementsByTagName('span')[0].style.color = 'red';
		window.selectedItem = node;
		return true;
	}
	// 延时遍历下一元素
	setTimeout(function () {
		// 清除样式
		node.removeAttribute('style');
		// 元素有子树时，从子树第一个元素开始遍历
		if (node.getElementsByTagName('ul').length > 0) {
			searchFun(searchWord, node.getElementsByTagName('ul')[0].getElementsByTagName('li')[0]);
		// 元素有相邻元素时，遍历相邻元素
		} else if (node.nextElementSibling) {
			searchFun(searchWord, node.nextElementSibling);
		// 没子树也没相邻元素，遍历上一级
		} else {
			while (node.parentNode != document.getElementById('tree') && !node.nextElementSibling) {
				node = node.parentNode.parentNode;
			}
			// 直到上一级有相邻元素，遍历上一级的相邻元素
			if (node.nextElementSibling) {
				searchFun(searchWord, node.nextElementSibling);
			}
		}
	}, 600);
}

// 初始化
window.onload = function () {
	// 全局变量指向选中元素
	selectedItem = false;
	// 绑定tree的点击事件
	bindTreeClick();
	// 绑定删除按钮
	document.getElementById('deleteBtn').onclick = deleteFun;
	// 绑定增加按钮
	document.getElementById('addBtn').onclick = addFun;
	// 绑定搜索按钮
	document.getElementById('searchBtn').onclick = function () {
		var searchWord = document.getElementById('search').value;
		var node = document.getElementById('tree').getElementsByTagName('li')[0];
		searchWord = searchWord.replace(/^\s+|\s+$/, '');
		// 搜索input不为空时处理
		if (searchWord) {
			// 如果有选定元素，先清除样式
			if (window.selectedItem) {
				window.selectedItem.removeAttribute('style');
				window.selectedItem.getElementsByTagName('span')[0].removeAttribute('style');
			}
			// 开始搜索
			searchFun(searchWord, node);
		}
	}
}