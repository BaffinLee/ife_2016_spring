//创建二叉树节点
function createBinaryTreeNode (parent, data) {
	parent = parent || null;
	data = data || "";
	var node = {};
	node.data = data;
	node.parent = parent;
	node.leftChild = null;
	node.rightChild = null;
	return node;
}

/* 创建二叉树
形如：
binaryTree = 
{
	data: "3",
	parent: null,
	leftChild: {
					data: "2",
					parent: pointerToParent,
					leftChild: {
									data: "1",
									parent: pointerToParent,
									leftChild: null,
									rightChild: null
								},
					rightChild: {
									data: "1",
									parent: pointerToParent,
									leftChild: null,
									rightChild: null
								}
				},
	rightChild: {
					data: "2",
					parent: pointerToParent,
					leftChild: {
									data: "1",
									parent: pointerToParent,
									leftChild: null,
									rightChild: null
								},
					rightChild: {
									data: "1",
									parent: pointerToParent,
									leftChild: null,
									rightChild: null
								}
				}

}
也是前序遍历
*/
function createBinaryTree (deep, parent) {
	deep = deep || 5;
	parent = parent || null;
	var node = createBinaryTreeNode(parent, deep);
	deep-=1;
	if (deep == 0) {
		return node;
	}
	node.leftChild = createBinaryTree(deep, node);
	node.rightChild = createBinaryTree(deep, node);
	return node;
}

// 渲染二叉树, 其实也是一个前序遍历
function render (binaryTree, container) {

	binaryTree = binaryTree || createBinaryTree();
	container = container || document.getElementById("binaryTree");

	var div = document.createElement("div");
	if (binaryTree.leftChild !== null) {
		render(binaryTree.leftChild, div);
	}
	if (binaryTree.rightChild !== null) {
		render(binaryTree.rightChild, div);
	}
	container.appendChild(div);
}

// 遍历处理器 
function traversalBinaryTree () {
	// 初始化二叉树
	document.getElementById("binaryTree").innerHTML = "";
	render();

	var type = document.getElementById("traversalType").value; // 此处不处理兼容性

	switch (type) {
		// 前序
		case "1":
			frontTraversal();
			break;
		// 中序
		case "2":
			midTraversal();
			break;
		// 后序
		default:
			lastTraversal();
			break;
	}
}

// 遍历函数 (遍历的是HTML元素，不是二叉树对象)
// 前序遍历
function frontTraversal (tree) {

	tree = tree || document.getElementById("binaryTree").childNodes[0];

	// 不是Element类型,或者到了tree外层div，就退出
	if (tree.nodeType != 1 || tree == document.getElementById("binaryTree")) {
		return;
	}

	// 设置背景红色
	tree.style.backgroundColor = "red";

	// 有子元素就跳到遍历第一个子元素 (遍历左树直到最后)
	if (tree.hasChildNodes()) {
		// 停留1秒
		setTimeout(function(){
			// 先把红色改回来
			tree.style.backgroundColor = "white";
			// 遍历第一个子元素
			frontTraversal(tree.childNodes[0]);
		}, 500);

	// 没有子元素了，要是有同级元素，遍历之 (遍历右树)
	} else if (tree.nextSibling) {
		setTimeout(function(){
			tree.style.backgroundColor = "white";
			frontTraversal(tree.nextSibling);
		}, 500);

	// 没有子元素也没有同级元素，就跳回父元素的同级元素 (遍历上一节点左树)
	} else {
		setTimeout(function(){
			tree.style.backgroundColor = "white";
			// 直到父元素有同级元素，或者没有父元素
			while (!tree.parentNode.nextSibling && tree.parentNode) {
				tree = tree.parentNode;
			}
			// 父元素有同级元素，直接跳到父元素的同级元素, 没父元素就退出
			if (tree.parentNode.nextSibling) {
				frontTraversal(tree.parentNode.nextSibling);
			}
		}, 500);
	}
}

// 中序遍历
function midTraversal (tree) {
	alert("Todo");
}

// 后序遍历
function lastTraversal (tree){
	alert("Todo");
}

// 初始化
function init () {
	render();
	document.getElementById("traversalBtn").onclick = traversalBinaryTree;
}

init();
