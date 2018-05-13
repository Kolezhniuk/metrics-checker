// noinspection LossyEncoding
function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
    }
    else {
        elem.attachEvent("on" + type, handler);
    }
}
function removeEvent(elem, type, handler) {

    if (elem.removeEventListener) { elem.removeEventListener(type, handler, false); }

    else { elem.detachEvent("on" + type, handler); }

}
function addText() {
    var xmlhttp, getText, url, mas,count, st;
    url = "text.txt";
    getText = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) { // ������ ���� �� �����
    count = 0;
    mas = xmlhttp.responseText.split('\n');
    st = "";
    for (count = 0; count < mas.length; count++) {
        st += mas[count] + "<br />";
    }
    document.getElementById("Text_txt").innerHTML = st;
        }
    };
    if (window.XMLHttpRequest) {//IE7+, Firefox, Ch rome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            xmlhttp = new window.ActiveXObject("Msxml2.XMLHTTP");//Msxml2.XMLHTTP
        } catch (e) {
            try {
                xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (g) {
                xmlhttp = false;
                alert("ajax is not support");
            }
        }
    }
    xmlhttp.onreadystatechange = getText;
    xmlhttp.open("GET", url,true);
    xmlhttp.send(null);
}
addEvent(window, "load", addText);