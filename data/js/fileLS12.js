function start() {//�������, �� �������� ���� �� ������ ���������� �������
    this.box = document.getElementById("box");
}

function table() {//������� �� ���� �� ��������� �������
    var table = document.createElement("table");//��������� �������
    var tr1 = document.createElement("tr");//��������� �����
    var td1 = document.createElement("td");//��������� ���������
    var td2 = td1.cloneNode(0);//��������� ������� ���������
    tr1.appendChild(td1);//�������� ������� ��������� �� �����
    tr1.appendChild(td2); //�������� ������� ��������� �� �����
    var tr2 = tr1.cloneNode(1);
    table.appendChild(tr1);//��������� �� ������� ������� �� ������� �����
    table.appendChild(tr2);
    if (this.box.childNodes.length > 0) {//�������� �� �������� �������� � �����
        this.box.replaceChild(table, this.box.firstChild);//���� � ����� ���� � �� �������� ������ ������� ������� �� �������
    }
    else {
        this.box.appendChild(table);//���� ���� ������ �� ������ ������ �������
    }
}
function list() {//������� �� ����� ������ � ����
    var ul = document.createElement("ul");//��������� ������
    for (var i = 1; i <= 4; i++) {//����, �� ���� �� ������ ������ ������
        var text = document.createTextNode("����� " + i);//�����, �� ���� ������ ����� � ������
        var li = document.createElement("li");//��������� ������ ������
        li.appendChild(text);//��������� ������ �� ������
        ul.appendChild(li);//��������� ������ �� ������
    }
    if (this.box.childNodes.length > 0) {
        this.box.replaceChild(ul, this.box.firstChild);
    }
    else {
        this.box.appendChild(ul);
    }
}
function img() {//�������, �� ���� �������� � ����
    var img = document.createElement("img");//��������� ���������� ��� ��������
    img.setAttribute("src", "image.jpg");//��������� �������� �� ����������, �� ����� �� �������� � ������� ������
    if (this.box.childNodes.length > 0) {
        this.box.replaceChild(img, self.box.firstChild); 
    }
    else {
        this.box.appendChild(img);
    }
}






