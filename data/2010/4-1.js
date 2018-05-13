/*jslint regexp: true, browser: true, sloppy: true, eqeq: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
function fixPageXY(e) {
  if (e.pageX == null && e.clientX != null ) { 
		var html = document.documentElement;
		var body = document.body;
	
		e.pageX = e.clientX + ((html && html.scrollLeft) || (body && body.scrollLeft) || 0) - (html.clientLeft || 0);
		e.pageY = e.clientY + ((html && html.scrollTop) || (body && body.scrollTop) || 0) - (html.clientTop || 0);
	}
}
function mouseShowHandler(e){
	e = e || window.event;
	fixPageXY(e);
	
	document.getElementById('mouseX').value = e.pageX;
	document.getElementById('mouseY').value = e.pageY;
	
	
}
function choiceHandler(e) {
	e = e || window.event;
	fixPageXY(e);
	
	
	var movElem = document.getElementsByTagName('img')[0];
	var x = movElem.offsetLeft - 25;
	var y = movElem.offsetTop - 25;
	movElem.style.position="absolute";
	
	document.getElementById('picX').value = (e.pageX + x + 50) / 2 + "px";
	movElem.style.left = (e.pageX + x) / 2 + "px";
	document.getElementById('picY').value = (e.pageY + y + 50) / 2 + "px";
	movElem.style.top = (e.pageY + y) / 2 + "px";
}
window.onload = function () {
	document.onmousemove = mouseShowHandler;
	document.onclick = choiceHandler;
};