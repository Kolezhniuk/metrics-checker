window.onload = function (){//коли сторінка завантажилась, обираємо за Id необхідні нам елементи
	var img = document.getElementById('img');
	var table = document.getElementById('table');
	var list = document.getElementById('list');
	var body = document.getElementById('body');//коли хтось клікнув на батон з надписом зоображення 
	var i,j;
	img.onclick = function (){ 
	if (document.getElementById('tmp')) {
body.removeChild(document.getElementById('tmp'));//якщо на сторінці є вже якась фігня, то видаляємо її
}
		var image = document.createElement("image");//створюємо новий елемент відповідного типу
		image.setAttribute ('src', 'pic.JPG');//додаємо атрибут src зі значенням pic.JPG
		image.setAttribute ('id', 'tmp');//додаємо атрибут id зі значенням tmp
		image.setAttribute ('width', '600px');//додаємо атрибут width зі значенням 600px
		image.setAttribute ('height', '400px');//додаємо атрибут height зі значенням 400px
		body.appendChild (image);//додаємо до body сhild'а
	};
	table.onclick = function (){ //коли хтось клікнув на батон з надписом табличка
		if (document.getElementById('tmp')) {
		body.removeChild(document.getElementById('tmp'));//якщо на сторінці є вже якась фігня, то видаляємо її
		}
		var table = document.createElement("table");//створюємо новий елемент відповідного типу
		table.setAttribute ('id', 'tmp');//додаємо атрибут id зі значенням tmp
		
		for (i=1; i <= 4; i ++) {//проходимо циклом та створюємо елементи tr до яких додаємо td (у цих td є ще текстові вузли), та додаємо ці елементи до таблички
			var tr = document.createElement("tr");
			
			for (j=1; j <= 4; j ++) {
				var td =  document.createElement("td");
				td.appendChild (document.createTextNode(String(i)+j));
				tr.appendChild (td);
			}
			table.appendChild (tr);
		}
		body.appendChild (table);//додаємо до body сhild'а
		
	};
	list.onclick = function (){ //коли хтось клікнув на батон з надписом список
		if (document.getElementById('tmp')) {
body.removeChild(document.getElementById('tmp'));//якщо на сторінці є вже якась фігня, то видаляємо її
}
		var list = document.createElement("li");//створюємо новий елемент відповідного типу
		list.setAttribute ('id', 'tmp');//додаємо атрибут id зі значенням tmp
		for (j=1; j <= 4; j ++) {//проходимо циклом, створюємо елементи ol додаємо текстові вузли, та додаємо ці елементи до li
			var ol =  document.createElement("ol");
			ol.appendChild (document.createTextNode(j));
			list.appendChild (ol);
		}
		body.appendChild (list);//додаємо до body сhild'а
		
	};
	
};

