import React from 'react';
import {render} from 'react-dom';
// import Sidebar from './app/Sidebar.js';
import Sidebar from '../app/Sidebar.js';


console.log("test script is happening");

const anchor = document.createElement('div');
anchor.id = 'sbr-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);
render(<Sidebar/>, document.getElementById('sbr-anchor'));

//test inject scripts
// document.body.insertAdjacentHTML( 'beforebegin', '<div id="myCustom"><h1>HI HI HI HI </h1></div>' );
// var newdiv = document.getElementById("myCustom");
// newdiv.style.backgroundColor="red";

//TEMP SOLUTION BELOW
// var iframe  = document.createElement ('iframe');
// iframe.src  = chrome.extension.getURL ('./app/sidebar.html');
// document.body.appendChild (iframe);
