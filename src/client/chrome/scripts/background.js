

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("----ON UPDATED----")
  console.log("CHANGEINFO");
  console.log(changeInfo);
  console.log("TAB");
  console.log(tab);
  if(tab.status == 'complete' && changeInfo.title){
    console.log("-------PUTTING IN---------");

    fetch('http://127.0.0.1:8000/pages/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({title: tab.title, url: tab.url})
    });
  }else{
    // console.log("else");
  }

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
