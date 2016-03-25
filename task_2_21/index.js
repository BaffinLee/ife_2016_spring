// 封装一个队列
var queue = {

	content: [], // 队列内容

	// 队列初始化
	init: function () {
		return this;
	},

	// 单个进入
	push: function (ele) {
		if (this.unique(ele)) {
			// 左侧进入
			this.content.unshift(ele);
			// 满了就pop
			if (this.content.length == 10) {
				this.content.pop();
			}
		}
	},

	// 数组进入
	pushArr: function (eleArr = []) {
		// 循环单一进入
		for (var i = 0; i < eleArr.length; i++) {
			this.push(eleArr[i]);
		}
	},

	// 渲染队列
	render: function (type = 'tag') { 
		// 默认渲染tag，也可以传入字符串渲染hobby
		var html = "";
		for (var i = 0; i < this.content.length; i++) {
			html += "<div>" 
				 + this.content[i] 
				 + "</div>";
		}
		document.getElementById(type).innerHTML = html;
	},

	// 单一测试
	unique: function (testEle) {
		// indexOf 在ECMA5才有，这里不考虑兼容性
		return this.content.indexOf(testEle) == -1;
	}
}

// hobby处理函数
function hobbyBtnHandle () {

	var num = document.getElementById("hobbyInput").value;

	// 中间空字符全部换成一个空格，首尾空字符不要
	num = num.replace(/[\s\r,，、]*/g, ' ').replace(/^\s+|\s+$/, '');
	
	hobbys.pushArr(num.split(" "));
}

// tag输入框处理函数
function tagHandle () {
	 var tagText = this.value;
	 if (/[\s，,]+$/.test(tagText)) {
	 	tagText = tagText.replace(/[\s\r，,]+$/, '');
	 	tags.push(tagText);
	 	this.value = "";
	 }
}

// 初始化函数
function init () {
	hobbys = queue.init(); 
	tags = queue.init(); // 隐式申明全局变量，不推荐这样干，不过这里为了放在init里就这么干了
	document.getElementById("tagInput").onkeyup = tagHandle;
	document.getElementById("hobbyBtn").onclick = hobbyBtnHandle;
}

init(); // 初始化页面
