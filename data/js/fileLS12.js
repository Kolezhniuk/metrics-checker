function start() {//функція, що ініціалізує блок де будуте розміщатись контент
    this.box = document.getElementById("box");
}

function table() {//створює та додає до документа таблицю
    var table = document.createElement("table");//створення таблиці
    var tr1 = document.createElement("tr");//створення рядку
    var td1 = document.createElement("td");//створення стовбчика
    var td2 = td1.cloneNode(0);//копіювання першого стовпчика
    tr1.appendChild(td1);//додавння першого стовпчика до рядка
    tr1.appendChild(td2); //додавння другого стовпчика до рядка
    var tr2 = tr1.cloneNode(1);
    table.appendChild(tr1);//додавання до таблиці першого та другого рядка
    table.appendChild(tr2);
    if (this.box.childNodes.length > 0) {//перевірка на наявність контенту у блоці
        this.box.replaceChild(table, this.box.firstChild);//якщо в блоці щось є то заміняємо перший дочірній елемент на таблицю
    }
    else {
        this.box.appendChild(table);//якщо блок пустий то просто додаємо таблицю
    }
}
function list() {//функція що додоає список у блок
    var ul = document.createElement("ul");//створюємо список
    for (var i = 1; i <= 4; i++) {//цикл, що додає до списку чотири пункти
        var text = document.createTextNode("Пункт " + i);//текст, що буду містити пункт у списку
        var li = document.createElement("li");//створення пункту списку
        li.appendChild(text);//додавання тексту до пункту
        ul.appendChild(li);//додавання пункту до списку
    }
    if (this.box.childNodes.length > 0) {
        this.box.replaceChild(ul, this.box.firstChild);
    }
    else {
        this.box.appendChild(ul);
    }
}
function img() {//функція, що додає картинку у блок
    var img = document.createElement("img");//створення контейнеру для картинки
    img.setAttribute("src", "image.jpg");//додавання атрибуту до контейнеру, що вказує на картинку у файловій системі
    if (this.box.childNodes.length > 0) {
        this.box.replaceChild(img, self.box.firstChild); 
    }
    else {
        this.box.appendChild(img);
    }
}






