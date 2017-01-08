var closed = false
var token = ""

function get_token(token_return){
  console.log("get token");
  console.log(token_return);
  token = token_return;
}
chrome.storage.local.get("hindsite-token", get_token);


//listens when a tab is opened, page is visited
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
  closed = false
  if(changeInfo.status == 'complete' && tab.title){
      if(tab.url != 'chrome://newtab/'){

        fetch('https://hindsite2020.herokuapp.com/newpage/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Token " + token['hindsite-token']

          },
          method: "POST",
          body: JSON.stringify({"tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active})
        }


      );
    }
  }
});

//listens when tab is removed
chrome.tabs.onRemoved.addListener(function( tabId, removeInfo) {
  chrome.windows.get(removeInfo.windowId, function (window) {
    closed = true
    fetch('https://hindsite2020.herokuapp.com/closetab/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token " + token['hindsite-token']

      },
      method: "POST",
      body: JSON.stringify({"tab":tabId})
    });
  });
});


chrome.tabs.onActivated.addListener(function (activeInfo){
  chrome.windows.get(activeInfo.windowId, function (window) {
    fetch('https://hindsite2020.herokuapp.com/active/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token " + token['hindsite-token']

      },
      method: "POST",
      body: JSON.stringify({"tab": activeInfo.tabId, "closed": closed})
    });
    closed = false
  });
});
