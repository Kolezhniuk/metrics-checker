var Request = (function()//�������
{ 
	var myClass = function ()//����������� �����
	{ 
		var self = this;
		self.container = document.getElementById('container')//���� ��� �������
//��������� ���� 

			document.getElementById('btLoadFile').addEventListener("click", function(){self.makeRequest('someTEXT.html', 'TextHandler');}, false);  
			document.getElementById('btXML').addEventListener("click", function(){self.makeRequest('someXML.xml', 'XMLHandler');}, false); 
			document.getElementById('btJSON').addEventListener("click", function(){self.makeRequest('someJSON.txt', 'JSONHandler');}, false); 
	}
	myClass.prototype =
	{
		makeRequest : function (url, handler)//�����
		{

			var self = this;
			var httpRequest = self.createXHR();//����-��������� ��������� ����� ��� ajax-������ 
			httpRequest.onreadystatechange = function() { self.showData(httpRequest, handler); };
			httpRequest.open("GET", url, true);//��������� ������
			httpRequest.send();//����������� ������

		},
		createXHR : function ()//����-��������� ��������� XMLHttpRequest
		{
			var httpRequest;
			if (window.XMLHttpRequest) //��� Mozila ...
			{ 
				httpRequest = new XMLHttpRequest();
				if (httpRequest.overrideMimeType) 
				{
					httpRequest.overrideMimeType('text/xml');
				}
			} 
			else if (window.ActiveXObject) 
			{ // ��� IE
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
			if (!httpRequest) //���� ���� �� ���������
			{
				alert('Giving up : Cannot create an XMLHTTP instance');
				return false;
			}
			return httpRequest;
		},
		showData : function (httpRequest, myHandler)//������� �������� ���� ajax ������
		{

			if (httpRequest.readyState == 4)
			{
				if (httpRequest.status == 200)
				{
				if(document.getElementById('inContainer'))//���� � ����
				{
					var inContainer = document.getElementById('inContainer');
					this.container.removeChild(inContainer);//��������� ����
				}

					obj[myHandler](httpRequest);//��������� �� ������
				} 
				else //������� � �������
				{
					alert('There was a problem with the request.');
				}
			}
		},
		XMLHandler : function (request)//������� ��� ������ � XML
		{
			var self = this;
			var xml = request.responseXML;//������ XML
			var students = xml.getElementsByTagName("student");//�������� ������
			var len = students.length;//������� ��������
			var ul = document.createElement('ul');//��������� �������
			for (var i = 0; i < len; i++)
				{//�������� ���� ����� �� �������
					var li = document.createElement('li');
					li.innerHTML = students[i].textContent;//�������� ����
					ul.appendChild(li);
				}
			ul.setAttribute('id', 'inContainer');//������ ������� ��� ���������� ���������
			this.container.appendChild(ul);
		},
		JSONHandler : function (request)//������� ��� ������ � JSON
		{
			var text = request.responseText;//���� �����
			var obj = JSON.parse(text);//��������� ����� JSON
			var table = document.createElement('table');
			var tb = document.createElement("tbody");
			for (var key in obj)//��������� ����� �� �������
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
			table.setAttribute('id', 'inContainer');//������ ������� ��� ���������� ���������
			this.container.appendChild(table);
		},
		TextHandler : function (request)//�������� ������
		{
			var textArea = document.createElement('textarea');
			textArea.innerHTML = request.responseText;
			textArea.setAttribute('id', 'inContainer');//������ �������
			this.container.appendChild(textArea);//������ �� ������
		}
	}

	if(window.addEventListener)
	{
		window.addEventListener("load", function(){obj = new myClass();}, false);//��������� ���� ���� �������� DOM
	}

})();