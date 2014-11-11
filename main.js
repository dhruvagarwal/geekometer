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

// function to nullify all addons on links
function nullify() {
	var a_s = document.getElementsByTagName("a");
	for (var i = 0; i < a_s.length; i++) {
		a_s[i].setAttribute("class","");
	};
}

function refreshChange() {
	nullify();
	a_s = document.getElementsByTagName("a");
	// for done
	var doneArray = localStorage["done"];
	if (typeof doneArray == 'undefined') {
		doneArray = [];
	}
	else {
		doneArray = JSON.parse(doneArray);
	}

	// for important
	var importantArray = localStorage["important"];
	if (typeof importantArray == 'undefined') {
		importantArray = [];
	}
	else {
		importantArray = JSON.parse(importantArray);
	}

	// for code
	var codeArray = localStorage["code"];
	if (typeof codeArray == 'undefined') {
		codeArray = [];
	}
	else {
		codeArray = JSON.parse(codeArray);
	}

	for (var j = 0; j < a_s.length; j++) {
		a_s[j].setAttribute("target","_blank"); // making all hyperlinks open in new window

		// for done
		for (var k = 0; k < doneArray.length;k++) {
			if (doneArray[k] == a_s[j].href || doneArray[k]==mappings[a_s[j].href]) {
				a_s[j].setAttribute("class","done "+a_s[j].className);
				a_s[j].style.color = "#8BA870";
				a_s[j].style.textDecoration = "line-through";
				break;
			};
		};

		// for important
		for (var k = 0; k < importantArray.length;k++) {
			if (importantArray[k] == a_s[j].href || importantArray[k]==mappings[a_s[j].href]) {
				a_s[j].setAttribute("class","important "+a_s[j].className);
				a_s[j].style.color = "#2B8CB6";
				break;
			};
		};

		// for code
		for (var k = 0; k < codeArray.length;k++) {
			if (codeArray[k] == a_s[j].href || codeArray[k]==mappings[a_s[j].href]) {
				a_s[j].setAttribute("class","done "+a_s[j].className);
				a_s[j].style.color = "#EA3C3C";
				// a_s[j].style.textDecoration = "line-through";
				break;
			};
		};
	};

	// for separating a tags --temporary
	content = document.getElementById('content')
	a_s = content.getElementsByTagName('a')
	for(i=0;i<a_s.length;i++)
	{
		a_s[i].innerHTML +='<br/>'; 
	}
}

refreshChange();

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

// adding widget/tooltip

var newDiv = "<div class='g4g draggable ui-widget-content' id='g4g' onmouseover='initiate()' title='Drag and Drop horizontally on screen'><input type='checkbox' onchange='checkChange()' id='donecheckbox'>Done |<input type='checkbox' onchange='checkChangeImp()' id='impcheckbox'>Important <!--input type='color' value='#2B8CB6' style='width:25px;padding:0;border:none;background:none;'--> | <input type='checkbox' onchange='checkChangeCode()' id='codecheckbox'> Code |  <button id='refresh' onclick = 'refreshChange()'>REFRESH</button></div>";
document.body.innerHTML += newDiv;

// console.log('ahashashashjhjsadhjashjd');

if (JSON.parse(localStorage.getItem('done')).indexOf(document.URL)!=-1) {
	donebox = document.getElementsByTagName('input');
	for (var i = 0; i < donebox.length; i++) {
		if (donebox[i].id === "donecheckbox") {
			donebox[i].setAttribute("checked","true");
		}
	};
}

if (JSON.parse(localStorage.getItem('important')).indexOf(document.URL)!=-1) {
	impbox = document.getElementsByTagName('input');
	for (var i = 0; i < impbox.length; i++) {
		if (impbox[i].id === "impcheckbox") {
			impbox[i].setAttribute("checked","true");
		}
	};	
}

if (JSON.parse(localStorage.getItem('code')).indexOf(document.URL)!=-1) {
	impbox = document.getElementsByTagName('input');
	for (var i = 0; i < impbox.length; i++) {
		if (impbox[i].id === "codecheckbox") {
			impbox[i].setAttribute("checked","true");
		}
	};	
}

// widget added