// html 预先写好了树，js只负责遍历html元素

// 遍历函数
function frontTraversal (e, tree) {

	// 坑 chrome会给button元素绑定的函数传入一个MouseEvent的参数，这个参数是第一个参数
	// 等下再来研究下这个参数，这里就先这样解决吧
	// 更新：只要是事件触发的函数，第一个参数都是event对象，具体分为很多种event，对象绑定由浏览器自动完成
	// console.log(e);
	
	tree = tree || document.getElementById('super');

	// 设置颜色
	tree.style.backgroundColor = "red";

	// 延时
	setTimeout(function () {

		// 搜索模式下，要是搜索到了 就停下
		if (window.searchWord == tree.getElementsByTagName('span')[0].innerHTML) {
			window.searchWord = "";
			return ;
		}

		// 清除颜色
		tree.style.backgroundColor = "white";

		// 遍历左树到底
		// 有div子元素即视为有左树
		// 这里肯定有一个span子元素，而且浏览器把回车都当做子元素，还是获取div子元素好点
		// 摔 if判断中空数组也为true
		if (tree.getElementsByTagName('div').length > 0) {
			frontTraversal(null, tree.getElementsByTagName('div')[0]);
		}

		// 遍历右树
		// nextSibiling会把回车、空格、注释等待都当做节点，nextElementSibiling不会
		else if (tree.nextElementSibling) {
			frontTraversal(null, tree.nextElementSibling);
		}

		// 回到上一级，继续遍历
		else {
			// 直到父元素有同级元素
			while (!tree.parentNode.nextElementSibling && tree.parentNode) {
				tree = tree.parentNode;
			}

			// 到树底部就退出
			if (tree.parentNode == document.getElementById('super')) {
				// 如果处于搜索模式，表示没找到，提示一下
				if (window.searchWord) {
					alert("找不到关键字");
					window.searchWord = "";
				}
				return ;
			}

			// 跳到父元素的同级元素
			if (tree.parentNode.nextElementSibling) {
				frontTraversal(null, tree.parentNode.nextElementSibling);
			}
		}

	}, 500);
}

// 搜索函数
function search (eee) {
	var searchWord = document.getElementById('searchInput').value;
	var tree = document.getElementById('super');
	// 全局变量表示搜索模式
	window.searchWord = searchWord.replace(/^\s*|\s*$/, '');
	if (!window.searchWord) {
		alert("请输入关键字");
		return ;
	}
	frontTraversal();
}

// 增加到节点
function addHandler () {
	 var text = document.getElementById('addInput').value;
	 var newNode = document.createElement('div');
	 var textNode = document.createElement('span');
	 text = text.replace(/^\s+|\s+$/, '');
	 textNode.appendChild(document.createTextNode(text));
	 newNode.appendChild(textNode);

	 if (window.selectedEle) {
	 	window.selectedEle.appendChild(newNode);
	 }
}

// 点击
function click (event) {
	// 点击div时 或 点击span时
	if (event.target && (event.target.nodeName.toUpperCase() == "DIV" || event.target.nodeName.toUpperCase() == "SPAN")) {

		var node = event.target.nodeName.toUpperCase() == "DIV" ? event.target : event.target.parentNode;

		// 之前有选中元素的话，清除掉样式
		if (window.selectedEle) {
			window.selectedEle.style.backgroundColor = "white";
		}

		window.selectedEle = node;
		node.style.backgroundColor = "red";
	} 
}

// 删除元素
function deleteHandler () {
	if (window.selectedEle) {
		window.selectedEle.parentNode.removeChild(window.selectedEle);
	}
}

// 初始化
window.onload = function () {
	// 全局变量表示搜索模式
	window.searchWord = "";

	// 选中的元素引用
	window.selectedEle = null;

	document.getElementById('frontTraversalBtn').onclick = frontTraversal;
	document.getElementById('searchBtn').onclick = search;
	document.getElementById('addBtn').onclick = addHandler;

	// super元素 及以下 所有div绑定点击事件
	document.getElementById('super').addEventListener('click', click, false);

	document.getElementById('deleteBtn').onclick = deleteHandler;
}