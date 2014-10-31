// hack to save redirected links
var mappings = {
    "http://www.geeksforgeeks.org/archives/11042": "http://www.geeksforgeeks.org/applications-of-queue-data-structure/", 
    "http://www.geeksforgeeks.org/archives/18754": "http://www.geeksforgeeks.org/implement-two-stacks-in-an-array/", 
    "http://www.geeksforgeeks.org/archives/6547": "http://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/", 
    "http://www.geeksforgeeks.org/archives/23449": "http://www.geeksforgeeks.org/check-if-a-given-binary-tree-is-complete-tree-or-not/", 
    "http://www.geeksforgeeks.org/archives/6921": "http://www.geeksforgeeks.org/reverse-a-stack-using-recursion/", 
    "http://www.geeksforgeeks.org/archives/5009": "http://www.geeksforgeeks.org/queue-using-stacks/", 
    "http://www.geeksforgeeks.org/archives/8405": "http://www.geeksforgeeks.org/next-greater-element/"
};

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
		a_s[j].setAttribute("target","_blank"); // making all hyperlinks open in new window
		for (var k = 0; k < arr.length;k++) {
			if (arr[k]==a_s[j].href || arr[k]==mappings[a_s[j].href]) {
				var tmp;
				tmp = a_s[j].innerHTML;
				a_s[j].innerHTML = '<font style="text-decoration:line-through;color: #8BA870" class="transformed">'+tmp+'</font>';
				break;
			};
		};
	};
}

crossdone();

// loading js files
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

// js files loaded

if (typeof localStorage['done'] == 'undefined') {
	var temp = [];
	localStorage.setItem('done', JSON.stringify(temp));
}

if (typeof localStorage['important'] == 'undefined') {
	var temp = [];
	localStorage.setItem('important', JSON.stringify(temp));
}

// adding widget

if (JSON.parse(localStorage.getItem('done')).indexOf(document.URL)!=-1) {
	var newDiv = "<div class='g4g draggable ui-widget-content' id='g4g' onmouseover='initiate()' title='Drag and Drop horizontally screen'><input type='checkbox' onchange='checkChange()' id='egcheckbox' checked='true' >Done |   <button id='refresh' onclick = 'crossdone()'>REFRESH</button></div>";	
}
else {
	var newDiv = "<div class='g4g draggable ui-widget-content' id='g4g' onmouseover='initiate()' title='Drag and Drop horizontally on screen'><input type='checkbox' onchange='checkChange()' id='egcheckbox'  >Done |   <button id='refresh' onclick = 'crossdone()'>REFRESH</button></div>";
}

document.body.innerHTML += newDiv;

// widget added