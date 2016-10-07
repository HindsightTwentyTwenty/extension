chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.create({'url': chrome.extension.getURL('views/index.html')}, function(tab){

  });
});
