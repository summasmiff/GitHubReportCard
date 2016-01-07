var ReportCard = {
		initialize: function(url) {
			$('#one-week').click(function() {
				console.debug('u click one week', url);
			});

	    $('#two-week').click(function() {
				console.debug('u click two week', url);
			});

	    $('#month').click(function() {
				console.debug('u click month', url);
			});
		}
	};

document.addEventListener('DOMContentLoaded', function(event) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		ReportCard.initialize(tabs[0].url);
	});
});

// baseUrl: this.document.location.href,
// d: new Date(),
// yyyy: d.getFullYear().toString(),

// weekFromNow: function() {
// 	var mm = (d.getMonth()+1).toString();
// 	var dd = (d.getDate()+7).toString();
// 	var date = (yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]));
// 	return date;
// },

// fortnightFromNow: function() {
// 	var mm = (d.getMonth()+1).toString();
// 	var dd = (d.getDate()+14).toString();
// 	var date = (yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]));
// 	return date;
// },

// monthFromNow: function() {
// 	var mm = (d.getMonth()+2).toString();
// 	var dd = (d.getDate()).toString();
// 	var date = (yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]));
// 	return date;
// },

// chooseTime: function() {
// 	$('#one-week').click(function() {
// 		console.log('clicked 1 week');
// 		baseUrl = this.weekFromNow();
// 	});
// 	$('#two-week').click(function() {
// 		console.log('clicked 2 week');
// 		baseUrl = this.fortnightFromNow();
// 	});
// 	$('#month').click(function() {
// 		console.log('clicked 1 month');
// 		baseUrl = this.monthFromNow();
// 	});
// 	this.getBookmarks();
// },

// getBookmarks: function() {
// 	chrome.bookmarks.getTree(function(bookmarks) {
// 		this.printBookmarks(bookmarks);
// 	});
// },

// printBookmarks: function(id) {
// 	chrome.bookmarks.getChildren(id, function(children) {
// 		this.bookmarkBar = children[0];
// 		this.createBookmark(bookmarkBar);
// 	});
// },

// createBookmark: function(bookmarkBar) {
// 	printBookmarks('0');
// 	var repoUrl = baseUrl + '/issues?utf8=✓&q=is%3Aissue+closed%3A>';
// 	var repoName = baseUrl.split('/')[4];
// 	var date = urlDate;
// 	var bookmarkBarId = bookmarkBar.id;
// 	var reportCardUrl = repoUrl + date + '+';
// 	var reportCardName = 'ReportCard: ' + repoName;
// 	chrome.bookmarks.create({
// 		parentId: bookmarkBarId,
// 		title: reportCardName,
// 		url: reportCardUrl
// 	},
// 	function newReportCard() {
// 		console.log('Added report card bookmark: ', reportCardUrl);
// 	});
// }
