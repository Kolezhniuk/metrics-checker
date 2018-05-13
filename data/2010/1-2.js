var myFunc = (function () 
{
    var myClass = function () {        
        var self = this;        
        var button  = document.getElementById('button');    
        var button1  = document.getElementById('button1');  
        button.addEventListener("click", function () { self.makeRequest('test.txt'); }, false); 
        button1.addEventListener("click", function () { self.remove(); }, false); 
        
    }
    myClass.prototype =
	{	   	   	    
	makeRequest: function(url) 
{	
	var self = this;
	var httpRequest;
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		httpRequest = new XMLHttpRequest();
		if (httpRequest.overrideMimeType) {
			httpRequest.overrideMimeType('text/xml');
			
		}
	} 
	else if (window.ActiveXObject) { // IE
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) {}
		}
	}

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	httpRequest.onreadystatechange = function() { self.getContent(httpRequest); };
	httpRequest.open('GET', url, true);
	httpRequest.send('');
},
	getContent: function(httpRequest) 
	    {
	    	    if (httpRequest.readyState == 4) 
	    	    	{
				if (httpRequest.status == 200) 
					{						
						var text = httpRequest.responseText;	
						var myObj = JSON.parse(text)							
						var table = document.createElement('table');
						var tableBody = document.createElement("tbody");    
						var content = document.getElementById('content');
						for (var key in myObj) 
							{
								
								     
								var tr = document.createElement('tr');
								var td1 = document.createElement('td');
								var td2 = document.createElement('td');
								td1.innerHTML = key;
								td2.innerHTML = myObj[key];
								tr.appendChild(td1);
								tr.appendChild(td2);
								tableBody.appendChild(tr);
								table.appendChild(tableBody);
							}							
							 content.appendChild(table);  
							 table.setAttribute('border', 'solid')
					}			
					
					else
						{
							alert('There was a problem with the request.');						
						}
					}                                  	             	    
			},
		remove: function (){			            
			var content = document.getElementById('content');           
			while (content.hasChildNodes())
			    {         
				content.removeChild(content.firstChild);  
			    }  		       
		}
	}
	
    
    window.addEventListener("load", function () { obj = new myClass(); }, false);
})();   



