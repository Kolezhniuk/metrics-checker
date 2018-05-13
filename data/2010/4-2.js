/*jslint sloppy: true, maxerr: 50, indent: 4 */
function get_random_color() {
    var r = function () { return Math.floor(Math.random() * 257); };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
}

function append(elem) {
	if (document.getElementById('new')) {document.body.removeChild(document.body.lastChild); }
	elem.id = 'new';
	document.body.appendChild(elem);
}

function clickONlist() {
	var newElem, n, li, i;
	newElem = document.createElement('ul');
	n = Math.floor(Math.random() * 10) + 3;
	for (i = 0; i < n; i += 1) {
	li = document.createElement('li');
	li.innerHTML = i;
	li.style.color = get_random_color();
	newElem.appendChild(li);
	}
	append(newElem);
}
function clickONpic() {
	var newElem = document.createElement('img');
	newElem.src = 'rff.jpg';
	append(newElem);
}
function clickONtable() {
	var newElem, x, y, i, j, r, c;
	newElem = document.createElement('table');
	newElem.style.width = '100%';
	newElem.style.borderCollapse = 'collapse';
	x = Math.floor(Math.random() * 10) + 10;
	y = Math.floor(Math.random() * 10) + 30;
	for (i = 0; i < y; i += 1) {
		r = newElem.insertRow(i);
		for (j = 0; j < x; j += 1) {
			c = r.insertCell(j);
			c.style.backgroundColor = get_random_color();
			c.style.height = '100px';
		}
	}
	append(newElem);
}

window.onload = function () {
	document.getElementById('myList').onclick = clickONlist;
	document.getElementById('myPic').onclick = clickONpic;
	document.getElementById('myTable').onclick = clickONtable;
};