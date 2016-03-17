window.onload = function (){
	$("#arrow").click(hideHeader);
	$("#menu").click(showHeader);
}

function hideHeader(){
	$("#header").slideUp();
	$("#arrow").slideUp(400,headerMinToggle);
}

function showHeader(){
	$("#headerMin").toggle(400,headerDown)
}

function headerMinToggle(){
	$("#headerMin").toggle(400);
}

function headerDown(){
	$("#header").slideDown();
	$("#arrow").slideDown();
}
