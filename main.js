function crossdone () {
	var arr = localStorage["done"];
	if (typeof arr == 'undefined') {
		arr = [];
	}
	else {
		arr = JSON.parse(arr);
	}
	var a_s = document.getElementsByTagName('a');
	for (var j = 0; j < a_s.length; j++) {
		for (var k = 0; k < arr.length;k++) {
			if (arr[k]==a_s[j].href) {
				var tmp;
				tmp = a_s[j].innerHTML;
				a_s[j].innerHTML = '<font style="text-decoration:line-through;color: #8BA870" class="transformed">'+tmp+'</font>';
				break;
			};
		};
	};
}

crossdone();

function reqListener () {
	var script_eg = document.createElement('script');
	script_eg.textContent = this.responseText;
	(document.head||document.documentElement).appendChild(script_eg);
}

var url = chrome.extension.getURL("funcs.js");
var xhrObj = new XMLHttpRequest();
xhrObj.onload = reqListener;
xhrObj.open("GET",url);
xhrObj.send();

url = chrome.extension.getURL("jquery.js");
var xhrObj = new XMLHttpRequest();
xhrObj.onload = reqListener;
xhrObj.open("GET",url);
xhrObj.send();

url = chrome.extension.getURL("jquery-ui.js");
var xhrObj = new XMLHttpRequest();
xhrObj.onload = reqListener;
xhrObj.open("GET",url);
xhrObj.send();

if (typeof localStorage['done'] == 'undefined') {
	var temp = [];
	localStorage.setItem('done', JSON.stringify(temp));
}

if (JSON.parse(localStorage.getItem('done')).indexOf(document.URL)!=-1) {
	var newDiv = "<div class='g4g draggable ui-widget-content' id='g4g' onmouseover='initiate()'><input type='checkbox' onchange='checkChange()' id='egcheckbox' checked='true'> Done | <button id='refresh' onclick = 'crossdone()'>Refresh</button></div>";	
}
else {
	var newDiv = "<div class='g4g draggable ui-widget-content' id='g4g' onmouseover='initiate()'><input type='checkbox' onchange='checkChange()' id='egcheckbox'> Done | <button id='refresh' onclick = 'crossdone()''>Refresh</button></div>";
}

document.body.innerHTML += newDiv;