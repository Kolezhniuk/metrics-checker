var Request = (function()//клоушер
{ 
	var myClass = function ()//конструктор класу
	{ 
		var self = this;
		self.container = document.getElementById('container')//блок для таблиць
//обробники подій 

			document.getElementById('btLoadFile').addEventListener("click", function(){self.makeRequest('someTEXT.html', 'TextHandler');}, false);  
			document.getElementById('btXML').addEventListener("click", function(){self.makeRequest('someXML.xml', 'XMLHandler');}, false); 
			document.getElementById('btJSON').addEventListener("click", function(){self.makeRequest('someJSON.txt', 'JSONHandler');}, false); 
	}
	myClass.prototype =
	{
		makeRequest : function (url, handler)//запит
		{

			var self = this;
			var httpRequest = self.createXHR();//крос-браузерне створення обєкту для ajax-запиту 
			httpRequest.onreadystatechange = function() { self.showData(httpRequest, handler); };
			httpRequest.open("GET", url, true);//параметри запиту
			httpRequest.send();//відправлення запиту

		},
		createXHR : function ()//крос-браузерне створення XMLHttpRequest
		{
			var httpRequest;
			if (window.XMLHttpRequest) //для Mozila ...
			{ 
				httpRequest = new XMLHttpRequest();
				if (httpRequest.overrideMimeType) 
				{
					httpRequest.overrideMimeType('text/xml');
				}
			} 
			else if (window.ActiveXObject) 
			{ // для IE
				try 
				{
					httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
				} 
				catch (e) 
				{
					try 
					{
						httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
					} 
					catch (e) {}
				}
			}
			if (!httpRequest) //якщо обєкт не створився
			{
				alert('Giving up : Cannot create an XMLHTTP instance');
				return false;
			}
			return httpRequest;
		},
		showData : function (httpRequest, myHandler)//функція обробник після ajax запиту
		{

			if (httpRequest.readyState == 4)
			{
				if (httpRequest.status == 200)
				{
				if(document.getElementById('inContainer'))//якщо є вміст
				{
					var inContainer = document.getElementById('inContainer');
					this.container.removeChild(inContainer);//видаляємо вміст
				}

					obj[myHandler](httpRequest);//викликаємо за назвою
				} 
				else //помилка з запитом
				{
					alert('There was a problem with the request.');
				}
			}
		},
		XMLHandler : function (request)//функція для роботи з XML
		{
			var self = this;
			var xml = request.responseXML;//прсинг XML
			var students = xml.getElementsByTagName("student");//отримуємо дерево
			var len = students.length;//кількість елементів
			var ul = document.createElement('ul');//створюємо таблицю
			for (var i = 0; i < len; i++)
				{//заносимо вміст файлу до таблиці
					var li = document.createElement('li');
					li.innerHTML = students[i].textContent;//заносимо данні
					ul.appendChild(li);
				}
			ul.setAttribute('id', 'inContainer');//задаємо атрибут для подальшого видалення
			this.container.appendChild(ul);
		},
		JSONHandler : function (request)//функція для роботи з JSON
		{
			var text = request.responseText;//вміст файлу
			var obj = JSON.parse(text);//створення обєкту JSON
			var table = document.createElement('table');
			var tb = document.createElement("tbody");
			for (var key in obj)//занесення даних до таблиці
			{
				var tr = document.createElement('tr');
				var td1 = document.createElement('td');
				var td2 = document.createElement('td');
				td1.innerHTML = key;
				td2.innerHTML = obj[key];
				tr.appendChild(td1);
				tr.appendChild(td2);
				tb.appendChild(tr);
				table.appendChild(tb);
			}
			table.setAttribute('id', 'inContainer');//задаємо атрибут для подальшого видалення
			this.container.appendChild(table);
		},
		TextHandler : function (request)//обробник тексту
		{
			var textArea = document.createElement('textarea');
			textArea.innerHTML = request.responseText;
			textArea.setAttribute('id', 'inContainer');//задаємо атрибут
			this.container.appendChild(textArea);//додаємо до дерева
		}
	}

	if(window.addEventListener)
	{
		window.addEventListener("load", function(){obj = new myClass();}, false);//створюємо обєкт після побудови DOM
	}

})();