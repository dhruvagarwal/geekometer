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

function removefromdone(link) {
	var rem = JSON.parse(localStorage.getItem('done'));
	var index = rem.indexOf(link);
	rem.splice(index,1);
	localStorage.setItem('done', JSON.stringify(rem));
}

function addtodone(link) {
	var doneArray=localStorage["done"];
	if (typeof doneArray == 'undefined') {
		doneArray = [link];
	}
	else {
		doneArray = JSON.parse(localStorage.getItem('done'));
		if (doneArray.indexOf(link) == -1){
			doneArray.push(link);
		}
	}
	localStorage.setItem('done', JSON.stringify(doneArray));
}

function removefromimp(link) {
	var rem = JSON.parse(localStorage.getItem('important'));
	var index = rem.indexOf(link);
	rem.splice(index,1);
	localStorage.setItem('important', JSON.stringify(rem));
}

function addtoimp(link) {
	var importantArray=localStorage["important"];
	if (typeof importantArray == 'undefined') {
		importantArray = [link];
	}
	else {
		importantArray = JSON.parse(localStorage.getItem('important'));
		if (importantArray.indexOf(link) == -1){
			importantArray.push(link);
		}
	}
	localStorage.setItem('important', JSON.stringify(importantArray));
}

// function to nullify all addons on links
function nullify() {
	var a_s = document.getElementsByTagName("a");
	for (var i = 0; i < a_s.length; i++) {
		a_s[i].setAttribute("class","");
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
	}

	for (var j = 0; j < a_s.length; j++) {
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
	};

}

function checkChange(){
	var eg_check = document.getElementById('donecheckbox');
	if (eg_check.checked) {
		addtodone(document.URL);console.log('checked');
	}
	else {
		removefromdone(document.URL);console.log('unchecked');
	}
}

// writing this method
function checkChangeImp(){
	var eg_check = document.getElementById('impcheckbox');
	if (eg_check.checked) {
		addtoimp(document.URL);console.log('checked');
	}
	else {
		removefromimp(document.URL);console.log('unchecked');
	}
}

function initiate() {
	if (this.title!='done') {
		this.title = 'done';
		effects();
	};
}

function effects () {
	$( "#g4g" ).draggable({ 
		containment: "#wrapper", scroll: true, axis: "x",
		drag: function( event, ui ) {  
			//$(document).tooltip({ disabled: true });
		},
		stop: function( event, ui ) {  
			//$(document).tooltip({ disabled: false }); 
		}
		
	});

	var old=0;
	var scvalue=0;
	$(window).scroll(function()	{
		old=scvalue;
		scvalue=($(window).scrollTop()); /*returns the vertical scrollbar position for the selected element,When the scrollbar is on the top, the position is 0.*/
		var mydiv=document.getElementById("g4g");
		
		if(scvalue>=320)  //you can change 200 to any other value by measuring scroll value displayed in top left div
		{
			//hide div
			if(old<scvalue)
			{$("#g4g").fadeOut();}
			else
			{$("#g4g").fadeIn();}
		}
		
		else
		{
			//show div, pushing div down
			$("#g4g").fadeIn();
		}

	});
	
	
	$(window).resize(function()	{
		var g4g=document.getElementById("g4g");
		g4g.style.left="0vh";
		/*var mtop=$("#g4g").css("margin-top");
		var mright=$("#g4g").css("margin-right");
		var t=$("#g4g").css("top");
		var r=$("#g4g").css("right");
		alert("margin-top:" +mtop + " , margin-right:" + mright + " ,top:" + t + " , right:" + r);*/
	});
	
	$(function() {
		$(document).tooltip();
    });
}