var ReportCard = {
	modifiedDate: '',

	getToday: function() {
		var d = new Date();
		var yyyy = d.getFullYear().toString();
		var mm = (d.getMonth()+1).toString();
		var dd = d.getDate().toString();
		var date = (yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]));
		return date;
	},

	weekFromNow: function() {
		var d = new Date();
		var yyyy = d.getFullYear().toString();
		var mm = (d.getMonth()+1).toString();
		var dd = (d.getDate()+7).toString();
		var date = (yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]));
		return date;
	},

	fortnightFromNow: function() {
		var d = new Date();
		var yyyy = d.getFullYear().toString();
		var mm = (d.getMonth()+1).toString();
		var dd = (d.getDate()+14).toString();
		var date = (yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]));
		return date;
	},

	monthFromNow: function() {
		var d = new Date();
		var yyyy = d.getFullYear().toString();
		var mm = (d.getMonth()+2).toString();
		var dd = (d.getDate()).toString();
		var date = (yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]));
		return date;
	},

	getBookmarks: function() {
		var self = this;
		chrome.bookmarks.getTree(function(bookmarks) {
			self.printBookmarks(bookmarks[0].id);
		});
	},

	printBookmarks: function(id) {
		var self = this;
		chrome.bookmarks.getChildren(id, function(children) {
			var bookmarkBar = children[0];
			self.createBookmark(bookmarkBar);
		});
	},

	createBookmark: function(bookmarkBar) {
		var repoUrl = this.url + '/issues?utf8=✓&q=is%3Aissue+closed%3A>';
		var today = this.getToday();
		var bookmarkBarId = bookmarkBar.id;
		var reportCardUrl = repoUrl + today + '+closed%3A<' + this.modifiedDate;
		var reportCardName = 'ReportCard: ' + this.repoName;
		chrome.bookmarks.create({
			parentId: bookmarkBarId,
			title: reportCardName,
			url: reportCardUrl
		},
		function newReportCard() {
			console.log('Added report card bookmark: ', reportCardUrl);
		});
	},

	initialize: function(url) {
		this.url = url;
		this.repoName = this.url.split('/')[4];
		$('#repo-name').append(this.repoName);
		var self = this;
		$('#one-week').click(function() {
			self.modifiedDate = self.weekFromNow();
			self.getBookmarks();
		});

    $('#two-week').click(function() {
			console.debug('u click two week', url);
			self.modifiedDate = self.fortnightFromNow();
			self.getBookmarks();
		});

    $('#month').click(function() {
			console.debug('u click month', url);
			self.modifiedDate = self.monthFromNow();
			self.getBookmarks();
		});
	},
};

document.addEventListener('DOMContentLoaded', function(event) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		ReportCard.initialize(tabs[0].url);
	});
});
