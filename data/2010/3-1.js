window.onload = function () {
    var body = document.getElementById('body');         //�������� �������� ������� �� ��
    var imageButton = document.getElementById('image');
    imageButton.onclick = function () {                 // ������� �� ���������� �� ��䳿 ���� �� ��������� ������
        if (document.getElementById('element'))         // ���������� �� � ���� �������� �� �������, ���� � ���������
        { body.removeChild(document.getElementById('element')); }
        var image = document.createElement('img');
        image.src = 'images.jpg';
        image.id = 'element';                           // ������� �� �������� ��� �������� ������ � ���, ����� �������� �� ���������� �� �������
        body.appendChild(image);                        // ������ �������� �� �������
    };
    var listButton = document.getElementById('list');
    listButton.onclick = function () {
        if (document.getElementById('element'))
        { body.removeChild(document.getElementById('element')); }
        var list = document.createElement("ul");
        list.id = 'element';
        list.appendChild(document.createElement("li"));           // ��������� ������
        list.lastChild.appendChild(document.createTextNode("Morozov"));
        list.appendChild(document.createElement("li"));
        list.lastChild.appendChild(document.createTextNode("Malimon"));
        list.appendChild(document.createElement("li"));
        list.lastChild.appendChild(document.createTextNode("Petrovich"));
        list.appendChild(document.createElement("li"));
        list.lastChild.appendChild(document.createTextNode("Globa"));
        body.appendChild(list);
    };
    var tableButton = document.getElementById('table');
    tableButton.onclick = function () {
        if (document.getElementById('element'))
        { body.removeChild(document.getElementById('element')); }
        var table = document.createElement("table");
        var i, j;
        for (i = 0; i < 4; i++) {                   // ��������� ��������
            table.appendChild(document.createElement("tr"));
            for (j = 0; j < 4; j++) {
                table.appendChild(document.createElement("td"));
                table.lastChild.appendChild(document.createTextNode("kimnata " + i + j));
            }
        }
        table.id = 'element';
        body.appendChild(table);
    };
};