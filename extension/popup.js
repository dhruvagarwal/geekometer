console.log('Welcome to Geekometer!');

$("#backup").click(function() {
	console.log('Wait Backing up your data !');

	chrome.storage.local.get(['done','important'], function(obj) {
		var done = JSON.stringify(obj.done);
		var important = JSON.stringify(obj.important);
		var email,token;
		email = localStorage["email"];
		if(email==="dhruvagga@gmail.com")
		{
			email1 = "dhruvagga@gmail.com";
			token1 = "ab12a90f3ce3d207";
		}
		else
		{
			email1 = "dhruvagarwal.dtu@gmail.com";
			token1 = "bd38a1000e2daa76";
		}

		console.log(done,important);
		$.ajax({
			url: "http://localhost:8000/backup/",
			method: "POST",
			data: { token: token1, email: email1, "done": done,"important": important},
			context: document.body
		}).done(function(obj) {
			if (obj.success===true) {
				$('#message').text('Backup successful!').animate();
			}
			else {
				$('#message').text('Backup was unsuccessful, Try Later').animate();
			};	
		});
	});
});

$("#fetch").click(function() {
	console.log('Wait fetching your data !');
	var done,important;
	var email,token;
		email = localStorage["email"];
		if(email==="dhruvagga@gmail.com")
		{
			email1 = "dhruvagga@gmail.com";
			token1 = "ab12a90f3ce3d207";
		}
		else
		{
			email1 = "dhruvagarwal.dtu@gmail.com";
			token1 = "bd38a1000e2daa76";
		}

	$.ajax({
		url: "http://localhost:8000/fetch/",
		method: "POST",
		data: { token: token1, email: email1, "done": done,"important": important},
		context: document.body
	}).done(function(obj) {
		console.log(obj);
		if (obj.success===true) {
			$('#message').text('Data Fetched!').animate();
			done = obj.done;
			important = obj.important;
			// console.log(done,important);

			chrome.storage.local.set({'done':done,'important':important,'fetch':true},function() {
				console.log('fetched values pushed');
				console.log('fetch flag set');
			});
		}
		else {
			$('#message').text('Fetching was unsuccessful, Try Later').animate();
		};	
	});
});
