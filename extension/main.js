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

	var color = localStorage["color"];
	if (typeof color == 'undefined') {
		color = "#2B8CB6";
	}
	
	// for done
	var doneArray = localStorage["done"];
	if (typeof doneArray == 'undefined') {
		doneArray = [];
	}
	else {
		doneArray = JSON.parse(doneArray);
	}

	// for important
	console.log('color is '+color);
	var importantArray = localStorage["important"];
	if (typeof importantArray == 'undefined') {
		importantArray = [];
	}
	else {
		importantArray = JSON.parse(importantArray);
		var newImp = [];
		for (i = 0; i < importantArray.length; i++) {
			if (typeof importantArray[i] == 'string') {
				newImp.push([importantArray[i],color]);
			}
			else
				newImp.push(importantArray[i]);
		}
		localStorage.setItem("important",JSON.stringify(newImp));
		importantArray = newImp;// copy the new array to previous
	}

	for (var j = 0; j < a_s.length; j++) {
		// TODO: make this optional
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
			if (importantArray[k][0] == a_s[j].href || importantArray[k][0]==mappings[a_s[j].href]) {
				a_s[j].setAttribute("class","important "+a_s[j].className);
				a_s[j].style.color = importantArray[k][1];
				break;
			};
		};
	};

}

refreshChange();

var scriptInjection = function(scripts) {
	this.toLoad = scripts.length;
	this.loaded = 0;

	var $this = this;
	for(i = 0; i < this.toLoad; i++) {
		var xhrObj = new XMLHttpRequest();
		xhrObj.onload = function() {
			var script_eg = document.createElement('script');
			script_eg.textContent = this.responseText;
			(document.head||document.documentElement).appendChild(script_eg);
			$this.loaded++;
		};
		xhrObj.open("GET",chrome.extension.getURL(scripts[i]));
		xhrObj.send();
	}
}

// js files loaded
if (typeof localStorage['done'] == 'undefined') {
	var temp = [];
	localStorage.setItem('done', JSON.stringify(temp));
}

if (typeof localStorage['important'] == 'undefined') {
	var temp = [];
	localStorage.setItem('important', JSON.stringify(temp));
}

if (typeof localStorage['color'] == 'undefined') {
	var temp = '#2B8CB6';
	localStorage.setItem('color', temp);
}
// adding widget/tooltip
var colors = ['#2B8CB6','#D78D1A','#2A342B','#E5431E','#8F53E8','#CD1AB0'];
var newDiv = "<div class='g4g draggable ui-widget-content' id='g4g' title='Drag and Drop horizontally on screen'><input type='checkbox' id='donecheckbox'>Done |<input type='checkbox' id='impcheckbox'>Important ";
// add colors here
newDiv += " |   <button id='refresh'>REFRESH</button></div>";
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

// to mark imp. checkbox true
var imp = JSON.parse(localStorage.getItem('important')),impLinks = [];
for (i = 0; i < imp.length; i++) {
	impLinks.push(imp[i][0]);
}

if (impLinks.indexOf(document.URL)!=-1) {
	impbox = document.getElementsByTagName('input');
	for (var i = 0; i < impbox.length; i++) {
		if (impbox[i].id === "impcheckbox") {
			impbox[i].setAttribute("checked","true");
		}
	};	
}

var sObj = new scriptInjection(['jquery.js', 'jquery-ui.js', 'funcs.js', 'listeners.js']);
// widget added
