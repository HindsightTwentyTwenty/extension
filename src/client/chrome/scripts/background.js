var closed = false;
var token = "";
var url = 'https://hindsite2020.herokuapp.com/'

function get_token(token_return){
  token = token_return['hindsite-token'];
}
chrome.storage.local.get("hindsite-token", get_token);

chrome.storage.onChanged.addListener(function(changes, namespace) {
  chrome.storage.local.get("hindsite-token", get_token);
})

//listens when a tab is opened, page is visited
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if(token && changeInfo.status == 'complete' && tab.title){
      chrome.tabs.sendMessage(tab.id, {text: 'get_dom'}, function(dom){
        var lastError = chrome.runtime.lastError;
        if (lastError) {
          var dom = "";
        }else{
          var strippedDom = dom.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi);
        }
        var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
        fetch(url + 'newpage/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Token " + token
          },
          method: "POST",
          body: JSON.stringify({"tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active, "html": strippedDom})
        }
      );
    });
    closed = false;
  }
});

//listens when tab is removed
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  if(token){
    closed = true;
    fetch(url + 'closetab/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token " + token
      },
      method: "POST",
      body: JSON.stringify({"tab": tabId})
    });
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo){
  if(token){
    chrome.tabs.get(activeInfo.tabId, function (tab){
      chrome.tabs.sendMessage(tab.id, {text: 'get_dom'}, function(dom){
        var lastError = chrome.runtime.lastError;
        if (lastError) {
          var dom = "";
        }
        var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
        fetch(url + 'active/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Token " + token
          },
          method: "POST",
          body: JSON.stringify({"tab": activeInfo.tabId, "closed": closed, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active, "html": dom})
        });
      });
        closed = false;
      });
    }
  });
