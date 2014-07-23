function removefromdone(link) {
	var rem = JSON.parse(localStorage.getItem('done'));
	var index = rem.indexOf(link);
	rem.splice(index,1);
	localStorage.setItem('done', JSON.stringify(rem));
}

function addtodone(link) {
	var arr=localStorage["done"];
	if (typeof arr == 'undefined') {
		arr = [link];
	}
	else {
		arr = JSON.parse(localStorage.getItem('done'));
		if (arr.indexOf(link) == -1){
			arr.push(link);
		}
	}
	localStorage.setItem('done', JSON.stringify(arr));
}

function crossdone () {
	// //nullify existing crosses
	var crosses = document.getElementsByClassName('transformed');
	while (crosses.length > 0) {
		for (var i = 0; i < crosses.length; i++) {
			var tmp = crosses[i].innerHTML;
			crosses[i].parentNode.innerHTML = tmp;
		};
		crosses = document.getElementsByClassName('transformed');
	}
	//crosses nullified
	//not sure about reasoning of above method

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

function checkChange(){
	var eg_check = document.getElementById('egcheckbox');
	if (eg_check.checked) {addtodone(document.URL);console.log('checked');}
	else {removefromdone(document.URL);console.log('unchecked');}
}

function initiate() {
	if (this.title!='done') {
		this.title = 'done';
		effects();
	};
}

function effects () {
	$( "#g4g" ).draggable({ 
		containment: "#wrapper", scroll: false
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

}
