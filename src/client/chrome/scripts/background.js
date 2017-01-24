var closed = false;
var token = "";

function get_token(token_return){
  token = token_return['hindsite-token'];
}
chrome.storage.local.get("hindsite-token", get_token);

chrome.storage.onChanged.addListener(function(changes, namespace) {
  chrome.storage.local.get("hindsite-token", get_token);
})

//listens when a tab is opened, page is visited
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
  closed = false;
  if(changeInfo.status == 'complete' && tab.title){
      chrome.tabs.sendMessage(tab.id, {text: 'get_dom'}, function(dom){
        var lastError = chrome.runtime.lastError;
        if (lastError) {
          var dom = "";
        }
        if(tab.url != 'chrome://newtab/'){
          fetch('https://hindsite2020.herokuapp.com/newpage/', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Token " + token
            },
            method: "POST",
            body: JSON.stringify({"tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active, "html": dom})
          }
        );
      }
    });
  }
});

//listens when tab is removed
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  closed = true;
  fetch('https://hindsite2020.herokuapp.com/closetab/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Token " + token
    },
    method: "POST",
    body: JSON.stringify({"tab": tabId})
  });
});

chrome.tabs.onActivated.addListener(function (activeInfo){
  chrome.tabs.get(activeInfo.tabId, function (tab){
    var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    chrome.tabs.sendMessage(tab.id, {text: 'get_dom'}, function(dom){
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        var dom = "";
      }
      if(tab.url != 'chrome://newtab/'){
        fetch('https://hindsite2020.herokuapp.com/active/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Token " + token
          },
          method: "POST",
          body: JSON.stringify({"tab": activeInfo.tabId, "closed": closed, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active, "html": dom})
        });
      }
      closed = false;
    });
  });
});
