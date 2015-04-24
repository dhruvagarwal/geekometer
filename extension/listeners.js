// JS code responsible for attaching listeners to different
// DOM elements

var l = function(args) {
	for(i = 0; i < args.length; i++) {
		document.getElementById(args[i].id)[args[i].listener] = args[i].callback;
	}
}


// for any further call backs attach it by passing as argument
new l([
		{
			id: 'g4g',
			listener: 'onmouseover',
			callback: function() {
				initiate(document.getElementById('g4g'));
			}
		},
		{
			id: 'donecheckbox',
			listener: 'onchange',
			callback: function() {checkChange();}
		},
		{
			id: 'impcheckbox',
			listener: 'onchange',
			callback: function() {checkChangeImp();}
		},
		{
			id: 'refresh',
			listener: 'onclick',
			callback: function() {refreshChange();}
		},
		{
			id: 'colorPallete',
			listener: 'onchange',
			callback: function() {console.log('something');changecolor(this.value);}
		},
		{
			id: 'rangeslider',
			listener: 'onload',
			callback: function() {console.log('something');}
		}
	]);
