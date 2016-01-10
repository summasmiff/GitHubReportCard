function showPageAction(tabId, changeInfo, tab) {
  chrome.pageAction.show(tabId);
}

chrome.tabs.onUpdated.addListener(showPageAction);

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    activeTab = tabs[0].id;
  });

  chrome.tabs.sendMessage(activeTab, {"activeTab": "clicked_page_action"});
});
