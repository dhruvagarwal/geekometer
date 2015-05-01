console.log('Welcome to Geekometer!');

$("#backup").click(function() {
	console.log('Wait Backing up your data !');
	chrome.storage.local.get(['done','important'], function(obj) {
		var done = JSON.stringify(obj.done);
		var important = JSON.stringify(obj.important);

		console.log(done,important);
		$.ajax({
			url: "http://localhost:8000/backup/",
			method: "POST",
			data: { token: "ab12a90f3ce3d207", email: "dhruvagga@gmail.com", "done": done,"important": important},
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
	$.ajax({
		url: "http://localhost:8000/fetch/",
		method: "POST",
		data: { token: "ab12a90f3ce3d207", email: "dhruvagga@gmail.com", "done": done,"important": important},
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
