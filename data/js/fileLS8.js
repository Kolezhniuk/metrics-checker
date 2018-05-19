/*jslint regexp: true, browser: true, sloppy: true, eqeq: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

window.onload = function () {
		var xmlhttp = getXmlHttp();
		var txt,xx,x,i;
		xmlhttp.open('GET', 'person.xml', true);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				txt="<table border='1'><tr><th>name</th><th>phoneNumber</th></tr>";
				x=xmlhttp.responseXML.documentElement.getElementsByTagName("PERSON");
				for (i=0;i<x.length;i++) {
					txt=txt + "<tr>";
					xx=x[i].getElementsByTagName("NAME");
					{
						try
						{
							txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
						}
						catch (er)
						{
							txt=txt + "<td> </td>";
						}
					}
					xx=x[i].getElementsByTagName("PHONE");
					{
						try
						{
							txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
						}
						catch (er)
						{
							txt=txt + "<td> </td>";
						}
					}
					txt=txt + "</tr>";
				}
				txt=txt + "</table>";
				document.getElementById('persons').innerHTML=txt;
				}
			};
		xmlhttp.send(null);
};