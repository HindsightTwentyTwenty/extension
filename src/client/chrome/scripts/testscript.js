
console.log("test script is happening");

//test inject scripts
// document.body.insertAdjacentHTML( 'beforebegin', '<div id="myCustom"><h1>HI HI HI HI </h1></div>' );
// var newdiv = document.getElementById("myCustom");
// newdiv.style.backgroundColor="red";

var iframe  = document.createElement ('iframe');
iframe.src  = chrome.extension.getURL ('./app/sidebar.html');
document.body.appendChild (iframe);
