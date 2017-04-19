var closed = false;
var token = "";
var encrypt_key="";
var md5="";
var url = 'https://hindsite2020.herokuapp.com/';
var tabAlarmName = 'tabAlarm';


chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log("HERE2");
  console.log('Turning ' + tab.url + ' red!');

  //file path is relative to the root of chrome
  chrome.tabs.executeScript(null, {file: "./scripts/testscript.js"});

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
