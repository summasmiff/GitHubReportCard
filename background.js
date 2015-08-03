sixHours = function() {
	return (60000 * 6);
};

function urlDate() {
	var d = new Date();
	var yyyy = d.getFullYear().toString();
  var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
  var dd = d.getDate().toString();
  return (yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]));
};

updateUrl = function() {
	updatedUrl = (repoUrl + urlDate());
	chrome.bookmarks.update('reportCard', {url: updatedUrl},
		function(updatedReportCard) {
			console.log('Updated report card bookmark')
		});
};


scheduleUrlUpdate = function(wait) {
	return setTimeout(updateUrl, sixHours());
};
