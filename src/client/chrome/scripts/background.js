import BASE_URL from '../../constants/GlobalConstants';


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
        fetch(BASE_URL + 'newpage/', {
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
chrome.tabs.onRemoved.addListener(function( tabId,  removeInfo) {
  if(tab.url != 'chrome://newtab/'){
    fetch(BASE_URL + 'closetab/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"tab":tabId})
    });
  }
});


chrome.tabs.onActivated.addListener(function (activeInfo){
  console.log("onActivated");
  // chrome.windows.get(activeInfo.windowId, function (window) {
    if(tab.url != 'chrome://newtab/'){
      fetch(BASE_URL + 'active/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"tab":tabId})
      });
    }
    console.log("callback")
    console.log(chrome.tabs);
  // });
});
