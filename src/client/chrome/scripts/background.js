chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.create({'url': chrome.extension.getURL('views/app.html')}, function(tab){

  });
});
