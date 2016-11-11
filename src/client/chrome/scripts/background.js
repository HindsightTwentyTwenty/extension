//listens when a tab is opened, page is visited
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];

  if(changeInfo.status == 'complete' && tab.title){
      if(tab.url != 'chrome://newtab/'){

        fetch('http://127.0.0.1:8000/newpage/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({"tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": 0})
        }


      );
    }
  }
});

//listens when tab is removed
chrome.tabs.onRemoved.addListener(function( tabId, removeInfo) {
  chrome.windows.get(removeInfo.windowId, function (window) {
    fetch('http://127.0.0.1:8000/closetab/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"tab":tabId})
    });
  });
});


chrome.tabs.onActivated.addListener(function (activeInfo){
  chrome.windows.get(activeInfo.windowId, function (window) {
    fetch('http://127.0.0.1:8000/active/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"tab": activeInfo.tabId})
    });
  });
});
