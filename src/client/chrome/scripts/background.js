var closed = false;
var token = "";
var encrypt_key="";
var md5="";
// var url = 'https://hindsite2020.herokuapp.com/';
var url = 'http://127.0.0.1:8000/';

var tabAlarmName = 'tabAlarm';
var open = false;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "openApp"){
      chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){
      });
    }
    if(request.greeting == "tabInfo"){
      console.log("tabinfo request areceived");
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        var tab = tabs[0];
        console.log("sending back taburl", tab.url);
        console.log("sending back tabtitle", tab.title);
        // sendResponse({taburl: tab.url, tabtitle: tab.title});
        sendResponse({greeting: "beepbeep"});
        chrome.tabs.sendMessage(tab.id, {greeting: "tabInfoResponse", taburl: tab.url, tabtitle: tab.title}, function(response) {
          console.log("sending not open");
        });
        console.log("send response");
      });
    }
  }
);


// console.log("tabinfo request areceived");
// chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//   console.log("NEW TAB");
//   var tab = tabs[0];
// });




/* execute the injection script on icon press */
chrome.browserAction.onClicked.addListener(function(tab) {


  // file path is relative to the root of chrome
  // if(!open){
  //   chrome.tabs.executeScript(null, {file: "./public/sidebar.entry.js"});
  // }else{
  //
  // }
  if(!open){
    console.log("not open1");
    // document.getElementById('sbr-anchor').show();
    open = true;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "openSidebar"}, function(response) {
        console.log("sending not open");
      });
    });
    // chrome.runtime.sendMessage({greeting: "openSidebar"});

  }else{
    console.log("open");
    // document.getElementById('sbr-anchor').hide();
    open = false;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "closeSidebar"}, function(response) {
        console.log("sending open");
      });
    });
    // chrome.runtime.sendMessage({greeting: "closeSidebar"});

  }

});

chrome.alarms.create(tabAlarmName, {
    delayInMinutes: 0,
    periodInMinutes: 15
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === tabAlarmName && token) {
        chrome.tabs.query({}, function(tabs) {
          var tab_ids = tabs.map(function(tab) {return tab.id;});
          fetch(url + 'tabupdate/', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Token " + token
            },
            method: "POST",
            body: JSON.stringify({"tab_ids":tab_ids})
          }
        );
      });
    }
});

function get_token(token_return){
  token = token_return['hindsite-token'];
}
chrome.storage.local.get("hindsite-token", get_token);

chrome.storage.onChanged.addListener(function(changes, namespace) {
  chrome.storage.local.get("hindsite-token", get_token);
})

function storeEncryption(json){
  chrome.storage.local.set({"md5":json['md5'], "ekey":json['key']});
}

/* checks if user has encrpytion key, if not it gets it */
function get_encrpyt_info(info_return){
  if(info_return['md5'] && info_return['ekey']){
    md5 = info_return['md5'];
    encrypt_key = info_return['ekey'];
  }
  else{
    fetch(url + 'decrypt/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token " + token
      },
      method: "GET"
    })
    .then(response => response.json())
    .then(json => {
      storeEncryption(json)
    })
  }
}

if(md5 == "" || encrypt_key == ""){
  chrome.storage.local.get(["md5", "ekey"], get_encrpyt_info);
}

//listens when a tab is opened, page is visited
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if(token && changeInfo.status == 'complete' && tab.title){
      var imageData;
      chrome.tabs.captureVisibleTab(function(dataString){
        imageData = dataString;
        chrome.tabs.sendMessage(tab.id, {text: 'get_dom'}, function(dom){
          var lastError = chrome.runtime.lastError;
          if (lastError) {
            var dom = "";
          }else{
            var strippedDom = dom.replace(/<script([^'"]|"(\\.|[^"\\])*"|'(\\.|[^'\\])*')*?<\/script>/gi, "");
          }
          var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
          fetch(url + 'newpage/', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Token " + token
            },
            method: "POST",
            body: JSON.stringify({"tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active, "html": strippedDom, "image": imageData})
          }
        );
      });
    });
    console.log("new tab", tab);

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
      fetch(url + 'active/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Token " + token
        },
        method: "POST",
        body: JSON.stringify({"tab": activeInfo.tabId, "closed": closed, "url":tab.url})
      }).then(function(response){

        if(response["status"] == 404){
          var imageData;
          chrome.tabs.captureVisibleTab(function(dataString){
            imageData = dataString;
            chrome.tabs.sendMessage(tab.id, {text: 'get_dom'}, function(dom){
              var lastError = chrome.runtime.lastError;
              if (lastError) {
                var dom = "";
              }else{
                var strippedDom = dom.replace(/<script([^'"]|"(\\.|[^"\\])*"|'(\\.|[^'\\])*')*?<\/script>/gi, "");
              }
              var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
              fetch(url + 'active/', {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': "Token " + token
                },
                method: "POST",
                body: JSON.stringify({"tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active, "html": strippedDom, "image": imageData})
              }
            );
          });
        });
        }
      });



        closed = false;
      }
    );
  }
});

// Send tabUpdate to backend on startup to close any tabs still open
// due to a chrome quit
chrome.runtime.onStartup.addListener(function (){
  if (token) {
    fetch(url + 'tabupdate/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token " + token
      },
      method: "POST",
      body: JSON.stringify({"tab_ids": []})
    });
  }
});
