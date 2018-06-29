// All variable definitions

var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};

//console.log(config);
var queryStrings = decodeURIComponent(window.location.search.substring(1)).split('&');
var appname = queryStrings[0];
var wait = queryStrings.indexOf('wait') > -1;
var silent = queryStrings.indexOf('silent') > -1;
var moreParams;
var i = 0;
do {
	// get the first querystring starting with '/' into var moreParams
	if (queryStrings[i].substr(0,1) == '/') {moreParams = queryStrings[i]}
	i++;
} while (i < queryStrings.length && !moreParams);
//console.log('moreParams:', moreParams);

var qrsUrl = (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") 
+ config.prefix + 'qrs/app/full';
var xrfkey = 'abcdefghijklmnop';


function redirUrl(id, moreParams) {
	return(config.prefix + 'sense/app/' + id + (moreParams ? moreParams : ''));
}

// functionality 

if (!silent || wait) {
	// if there is no "silent" option or if "wait" is an option, show body
	document.getElementsByTagName("body")[0].style = '';
}

if (appname) {
	//console.log('qrsUrl:', qrsUrl);
	//console.log('appname:', appname);
	document.getElementById('appName').innerText = appname; 

	var httpRequest = new XMLHttpRequest();
	
	httpRequest.open("GET", qrsUrl + "?filter=name%20so%20'" + appname + "'&xrfkey=" + xrfkey, true);
	httpRequest.setRequestHeader("x-Qlik-Xrfkey", xrfkey);
	httpRequest.send();

	httpRequest.onload= function() { 
		if (httpRequest.readyState == 4)
		{
			//var _tempRecommendations = httpRequest.responseXML;
			var qrsResponse = JSON.parse(httpRequest.response);
			console.log('qrsResponse:', qrsResponse);
			document.getElementById('totalCount').innerText = 'Total: ' + qrsResponse.length;
			
			if (qrsResponse.length == 0) {
				document.getElementById('extError').innerText = 'No such app found. Try a different app name.'; 					
			} else {
				var table = document.getElementById('qrsAnswer').appendChild(document.createElement('table'));
				var tr = table.appendChild(document.createElement('tr'));
				tr.appendChild(document.createElement('th')).innerHTML = 'App Id';
				tr.appendChild(document.createElement('th')).innerText = 'App Name';

				qrsResponse.forEach(function (arrItem) {
					var tr = table.appendChild(document.createElement('tr'));
					tr.appendChild(document.createElement('td')).innerHTML = '<a href="' + redirUrl(arrItem.id, moreParams) + '">' + arrItem.id + '</a>';
					tr.appendChild(document.createElement('td')).innerHTML = '<a href="' + redirUrl(arrItem.id, moreParams) + '">' + arrItem.name + '</a>';
				});

				if (qrsResponse.length == 1) {
					if (!wait) {
						// if there is no "wait" option and 1 result was found, auto-redirect browser
						location.href = redirUrl(qrsResponse[0].id, moreParams); 
						document.getElementById('moreInfo').innerText += 'Redirecting to first app ...';
					} else {
						document.getElementById('moreInfo').innerText += 'Option "wait" found, click on the app above to open it.';
					}
				} else {
					// if there is more than one result, show body (even if "silent" option)
					document.getElementsByTagName("body")[0].style = '';
					document.getElementById('moreInfo').innerText = 'Click on the app above to open it.';
				}
			}

		}
	};  

} else {
	document.getElementById('extError').innerText = 'No querystring found in url. Add "?<appname>" to your url.'; 
}
