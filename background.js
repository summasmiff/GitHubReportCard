sixHours = function() {
	return 60000 * 6);
};

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  //or 2 for date or 3
  return yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]); // padding
};

console.log(new Date());

updateUrl = function() {
	var d = new Date();
	chrome.bookmarks.update('reportCard', {url: (repoUrl + d).join('')},
		function(updatedReportCard) {
			console.log('Updated report card bookmark')
		});
};


scheduleUrlUpdate = function(wait) {
	return setTimeout(updateUrl, sixHours());
};
