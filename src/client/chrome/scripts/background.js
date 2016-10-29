
//listens when a tab is opened, page is visited
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("----ON UPDATED----")
  console.log("CHANGEINFO");
  console.log(changeInfo);
  console.log("TAB");
  console.log(tab);
  var domain_reg = /.*([^\.]+)(com|net|org|info|coop|int|co\.uk|org\.uk|ac\.uk|uk)$/;
  var domain = domain_reg.exec(tab.url);
  domain = "test";
  console.log(domain);
  if(changeInfo.status == 'complete' && tab.title){
      console.log("-------PUTTING IN---------");

      fetch('http://127.0.0.1:8000/newpage/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url}
  )

    });
  }

});

//listens when tab is removed
chrome.tabs.onRemoved.addListener(function( tabId,  removeInfo) {
  console.log("tab removed!");

});


chrome.tabs.onActivated.addListener(function (activeInfo){
  console.log("onActivated");
  chrome.windows.get(activeInfo.windowId, function (window) {
    console.log("callback")
    console.log(chrome.tabs);
  });


});


//
// import fetch from 'isomorphic-fetch'
//
//
// chrome.tabs.onCreated.addListener(function(tab){
//   fetch('http://127.0.0.1:8000/categories/', {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify({tab: tab.title})
//   }
//
// )
// });
