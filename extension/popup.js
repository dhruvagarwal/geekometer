console.log('Welcome to Geekometer!');
var details={"interactive": true};

document.getElementById("button").addEventListener('click', function() {
	console.log('clicked');
	chrome.identity.getAuthToken(details, function(token) {
		console.log(token);
	});
});
