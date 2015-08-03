function showPageAction(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
}
chrome.tabs.onUpdated.addListener(showPageAction);

chrome.pageAction.onClicked.addListener(function(tab) {
	var baseUrl = '';
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
	  baseUrl = tabs[0].url;
	  return baseUrl;
	});

	//format date properly
	function urlDate() {
		var d = new Date();
		var yyyy = d.getFullYear().toString();
	  var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
	  var dd = d.getDate().toString();
	  return (yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]));
	};

	//get bookmarks
	var bookmarkBar;
	chrome.bookmarks.getTree(function(bookmarks) {
	  printBookmarks(bookmarks);
	});
	printBookmarks('0');
	function printBookmarks(id) {
		chrome.bookmarks.getChildren(id, function(children) {
			bookmarkBar = children[0];
			createBookmark(bookmarkBar);
		});
	}

	//create bookmark
	function createBookmark(bookmarkBar) {
		var repoUrl = baseUrl + '/issues?utf8=✓&q=is%3Aissue+closed%3A>';
		var repoName = baseUrl.split('/')[4];
		var date = urlDate();
		var bookmarkBarId = bookmarkBar.id;
		var reportCardUrl = repoUrl + date + '+';
		var reportCardName = 'ReportCard: ' + repoName;
		chrome.bookmarks.create({
			parentId: bookmarkBarId,
			title: reportCardName,
			url: reportCardUrl
		},
		function newReportCard() {
			console.log('Added report card bookmark: ', reportCardUrl);
		});
	};
});
