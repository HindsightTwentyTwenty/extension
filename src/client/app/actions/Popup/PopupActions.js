import * as types from '../constants/ActionTypes';

export function addPage(ptitle, purl, pstarred, pcategories){
  return {
    type: types.ADD_PAGE,
    url: purl,
    title: ptitle,
    starred: pstarred,
    pcategories: pcategories,
  }
}
