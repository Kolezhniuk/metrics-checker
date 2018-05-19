var myFunc = (function () 
{
    var myClass = function () {        
        var self = this;        
        var button  = document.getElementById('button');          
        button.addEventListener("click", function () { self.makeRequest('test.txt'); }, false);                               
    }
    myClass.prototype =
	{	   	   	    
	makeRequest: function(url){	
	var self = this;
	var httpRequest;
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		httpRequest = new XMLHttpRequest();
		if (httpRequest.overrideMimeType) {
			httpRequest.overrideMimeType('text/xml');
			// See note below about this line
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
	httpRequest.open('GET', 'test.txt', true);
	httpRequest.send('');
},
	getContent: function(httpRequest) 
	    {
	    	    if (httpRequest.readyState == 4) 
	    	    	{
				if (httpRequest.status == 200) 
					{
						var temp = document.getElementById('p');
						temp.innerHTML = httpRequest.responseText;			
					} 
				else
					{
						alert('There was a problem with the request.');						
					}
		    	}                                  
	    }          


	    
	}    
    
    window.addEventListener("load", function () { obj = new myClass(); }, false);
})();    


