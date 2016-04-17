/*
	全局飞船状态（实际的）
	starState 格式
	[
		{
			id : 1,
			star : pointer
		}
	]
 */
var starState = [];

// 指挥官
var commander = {

	// 指挥官假想飞船状态
	starState : [],

	// 生成命令
	createCommand : function (e) {

		// 初始化命令
		var mediator = {
			id : 0,
			command : ''
		};

		// 接管button点击事件
		if (e.target && e.target.nodeName.toLowerCase() == 'button') {

			// 读取button的class作为命令
			mediator.command = e.target.getAttribute('class');

			// 读取button外层div的id为飞船id
			if (mediator.command != 'add') {
				mediator.id = e.target.parentNode.getAttribute('id').split('-')[1];
			}

			// 发送命令
			commander.sendCommand(mediator);
		}
	},

	// 广播命令
	sendCommand : function (mediator) {
		// 命令是销毁时，更新假想飞船状态
		if (mediator.command == 'destroy') {
			commander.destroyStar(mediator.id);
			
		// 命令是创建飞船时，不需要发送命令	
		} else if (mediator.command == 'add') {
			commander.createStar();
			return true;
		}

		// 广播命令
		for (var i = 0; i < window.starState.length; i++) {
			window.starState[i].star.receiveMediator(mediator);
		}
	},

	// 创建飞船
	createStar : function () {
		var newItem = {};

		// 创建新飞船
		newItem.star = new Star();

		// 取最后一个飞船的id+1为新飞船id
		newItem.starId = window.starState[window.starState.length - 1].id + 1;

		// 更新全局飞船状态
		window.starState.push(newItem);

		// 更新指挥官假想飞船状态
		commander.starState.push(newItem);

		// 重新渲染
		render();
	},

	// 销毁飞船
	destroyStar : function (id) {
		// 只更新假想飞船状态
		// 遍历找到id为传入id的飞船
		for(var i = 0; i < commander.starState.length; i++){
			// 找到就删除, 退出遍历
			if (commander.starState[i].id == id) {
				commander.starState.splice(i, 1);
				break;
			}
		}
	}
};

// 渲染函数
function render () {

}

// 页面初始化
window.onload = function () {
	// 绑定button点击事件到指挥官处理
	document.getElementById('control').addEventListener('click', commander.createCommand);
}
