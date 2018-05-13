function ImageClick() {

    var container = document.getElementById('container');
    if (document.getElementById('current')) { container.removeChild(container.firstChild); }
    var image = document.createElement('img');
    image.setAttribute('id', 'current');
    image.setAttribute('src', 'ki.JPG');
    container.appendChild(image);
}
function ListClick() {
    var container = document.getElementById('container');
    if (document.getElementById('current')) { container.removeChild(container.firstChild); }
    var list = document.createElement('ul');
    list.setAttribute('id', 'current');
    var i = 0;
    for (i = 0; i < 6; i++) {
        var item = document.createElement("li");
        item.innerHTML = "item" + i;
        list.appendChild(item);
    }
    container.appendChild(list);

}
function TableClick() {
        var container = document.getElementById('container');
        if (document.getElementById('current')) { container.removeChild(container.firstChild); ; }
        var table = document.createElement('table');
        table.setAttribute('id', 'current');
        var i = 0;
        var j = 0;
        for (i = 0; i < 6; i++) {
            var line = document.createElement('tr');
            for (j = 0; j < 5; j++) {
                var cell = document.createElement('td');
                cell.innerHTML = 'line= ' + i + ', column= ' + j;
                line.appendChild(cell);
            }
            table.appendChild(line);
        }
        container.appendChild(table);

}
window.onload = function () {


    document.getElementById('image').onclick = ImageClick;
    document.getElementById('list').onclick = ListClick;
    document.getElementById('table').onclick = TableClick;

};
