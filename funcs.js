
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
	var content = document.getElementsByClassName('page-content')[0];
	try {
		var para = content.getElementsByTagName('p');
		for (var i=0;i<para.length;i++) {
			a_s = para[i].getElementsByTagName('a');
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
		};
	}
	catch(err) {
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
}

function checkChange(){
	var eg_check = document.getElementById('egcheckbox');
	if (eg_check.checked) {addtodone(document.URL);console.log('checked');}
	else {removefromdone(document.URL);console.log('unchecked');}
}
