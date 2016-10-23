import * as types from '../../constants/ActionTypes';

export function addPage(ptitle, purl, pstarred, pcategories){
  //async chrome query call
  // var queryInfo = {
  //   active: true,
  //   currentWindow: true
  // };
  //
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   var tab = tabs[0];
  //   var purl = tab.url;
  //   var ptitle = tab.title;
  // }

  return {
    type: types.ADD_PAGE,
    url: purl,
    title: ptitle,
    starred: pstarred,
    pcategories: pcategories,
  }
}

export function addCategory(ctitle){
  return {
    type: types.ADD_CATEGORY,
    title: ctitle,
  }
}
