window.onload = function (){//���� ������� �������������, ������� �� Id �������� ��� ��������
	var img = document.getElementById('img');
	var table = document.getElementById('table');
	var list = document.getElementById('list');
	var body = document.getElementById('body');//���� ����� ������ �� ����� � �������� ����������� 
	var i,j;
	img.onclick = function (){ 
	if (document.getElementById('tmp')) {
body.removeChild(document.getElementById('tmp'));//���� �� ������� � ��� ����� �����, �� ��������� ��
}
		var image = document.createElement("image");//��������� ����� ������� ���������� ����
		image.setAttribute ('src', 'pic.JPG');//������ ������� src � ��������� pic.JPG
		image.setAttribute ('id', 'tmp');//������ ������� id � ��������� tmp
		image.setAttribute ('width', '600px');//������ ������� width � ��������� 600px
		image.setAttribute ('height', '400px');//������ ������� height � ��������� 400px
		body.appendChild (image);//������ �� body �hild'�
	};
	table.onclick = function (){ //���� ����� ������ �� ����� � �������� ��������
		if (document.getElementById('tmp')) {
		body.removeChild(document.getElementById('tmp'));//���� �� ������� � ��� ����� �����, �� ��������� ��
		}
		var table = document.createElement("table");//��������� ����� ������� ���������� ����
		table.setAttribute ('id', 'tmp');//������ ������� id � ��������� tmp
		
		for (i=1; i <= 4; i ++) {//��������� ������ �� ��������� �������� tr �� ���� ������ td (� ��� td � �� ������� �����), �� ������ �� �������� �� ��������
			var tr = document.createElement("tr");
			
			for (j=1; j <= 4; j ++) {
				var td =  document.createElement("td");
				td.appendChild (document.createTextNode(String(i)+j));
				tr.appendChild (td);
			}
			table.appendChild (tr);
		}
		body.appendChild (table);//������ �� body �hild'�
		
	};
	list.onclick = function (){ //���� ����� ������ �� ����� � �������� ������
		if (document.getElementById('tmp')) {
body.removeChild(document.getElementById('tmp'));//���� �� ������� � ��� ����� �����, �� ��������� ��
}
		var list = document.createElement("li");//��������� ����� ������� ���������� ����
		list.setAttribute ('id', 'tmp');//������ ������� id � ��������� tmp
		for (j=1; j <= 4; j ++) {//��������� ������, ��������� �������� ol ������ ������� �����, �� ������ �� �������� �� li
			var ol =  document.createElement("ol");
			ol.appendChild (document.createTextNode(j));
			list.appendChild (ol);
		}
		body.appendChild (list);//������ �� body �hild'�
		
	};
	
};

