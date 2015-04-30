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

var colors = ['#2B8CB6','#8055B4','#FF7070'];

// function to nullify all addons on links
function nullify() {
	var a_s = document.getElementsByTagName("a");
	for (var i = 0; i < a_s.length; i++) {
		a_s[i].setAttribute("style","");
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
		var newImp = [];
		for (i = 0; i < importantArray.length; i++) {
			if (typeof importantArray[i] == 'string') {
				newImp.push([importantArray[i],1]);
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
				// a_s[j].setAttribute("class","done "+a_s[j].className);
				a_s[j].style.color = "#8BA870";
				a_s[j].style.textDecoration = "line-through";
				break;
			};
		};

		// for important
		for (var k = 0; k < importantArray.length;k++) {
			if (importantArray[k][0] == a_s[j].href || importantArray[k][0]==mappings[a_s[j].href]) {
				// a_s[j].setAttribute("class","important "+a_s[j].className);
				a_s[j].style.color = colors[importantArray[k][1]-1];
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
};

if (typeof localStorage['important'] == 'undefined') {
	var temp = [];
	localStorage.setItem('important', JSON.stringify(temp));
};

// adding widget/tooltip
var level = ['Easy','Medium','Hard'],step = 33;
var newDiv = "<div class='g4g draggable ui-widget-content' id='g4g' title='Drag and Drop horizontally on screen'><input type='checkbox' id='donecheckbox'>Done |";
newDiv += "<input type=range step="+step+" value=0 id='rangeslider' title='Slide it Left to Right to mark Easy,Medium or Hard Level'/>"
newDiv += " |   <button id='refresh'>REFRESH</button></div>";
document.body.innerHTML += newDiv;

function backup() {
	done = localStorage['done'];
	important = localStorage['important'];
	console.log(done.length,important.length,chrome.storage.local);
	chrome.storage.local.set({'done':done,'important':important},function(){
		console.log('values pushed');
	});
}

backup();

if (JSON.parse(localStorage.getItem('done')).indexOf(document.URL)!=-1) {
	donebox = document.getElementsByTagName('input');
	for (var i = 0; i < donebox.length; i++) {
		if (donebox[i].id === "donecheckbox") {
			donebox[i].setAttribute("checked","true");
		};
	};
};

// set handle of rangeslider
var impArray = JSON.parse(localStorage.getItem('important'));
for (var i = 0; i < impArray.length; i++) {
	if (impArray[i][0]==document.URL) {
		// set the rangeslider cursor accordingly
		var level = impArray[i][1];
		color = colors[level-1];
		rangeslider = document.getElementById('rangeslider');
		rangeslider.setAttribute('value',level*step);
		rangeslider.style.background = color;
		// fill the rangeslider with color
	};
};

var sObj = new scriptInjection(['jquery.js', 'jquery-ui.js', 'funcs.js', 'listeners.js']);
// widget added
