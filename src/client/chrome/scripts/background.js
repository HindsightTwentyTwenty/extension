//listens when a tab is opened, page is visited
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("----ON UPDATED----")
  console.log("CHANGEINFO");
  console.log(changeInfo);
  console.log("TAB");
  console.log(tab);

  var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
  console.log(domain);
  if(changeInfo.status == 'complete' && tab.title){
      console.log("-------PUTTING IN---------");
      if(tab.url != 'chrome://newtab/'){
        fetch('http://127.0.0.1:8000/newpage/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({"tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url})
        }
      );
    }
  }
});

//listens when tab is removed
chrome.tabs.onRemoved.addListener(function( tabId, removeInfo) {
  console.log("removeInfo and tabId: ", removeInfo, tabId);
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
  console.log("onActivated", activeInfo, activeInfo.tabId);
  chrome.windows.get(activeInfo.windowId, function (window) {
    fetch('http://127.0.0.1:8000/active/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"tab": activeInfo.tabId})
    });
    console.log("callback")
    console.log(chrome.tabs);
  });
});

chrome.extension.onMessage.addListener( function(request, sender, sendResponse) {
  console.log("Got a message in background.js");
  if( request.greeting === "GetURL" )
  {
      var tabURL = "Not set yet";
      chrome.tabs.query({active: true, currentWindow: true},function(tabs){
          if(tabs.length === 0) {
              sendResponse({});
              return;
          }
          tabURL = tabs[0].url;
          sendResponse( {navURL:tabURL} );
      });
  }
});
