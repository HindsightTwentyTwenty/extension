import * as types from '../constants/ActionTypes';

function categoryPagesReducer(state = {catsToPages: {}, starred: {}, showStarred: false}, action){
  switch(action.type){
    case types.REMOVE_CAT_FROM_PAGE:
      var newPageInfo = action.json;
      var catsToPagesDict = Object.assign({}, state.catsToPages);
      for (let cat in catsToPagesDict) {
        if (catsToPagesDict[cat][newPageInfo.pk]) {
          catsToPagesDict[cat][newPageInfo.pk] = newPageInfo;
        }
      }
      return {...state, catsToPages: catsToPagesDict};
    case types.RECEIVE_CATEGORIES_AND_PAGES:
      var catsToPagesDict = {};
      action.json.categories.map(function(category) {
        var pagesToCatsDict = {};
        category.pages.map(function(page) {
          pagesToCatsDict[page.pk] = {
            "pk": page.pk,
            "title": page.title,
            "url": page.url,
            "star": page.star,
            "categories": page.categories,
            "created": page.created,
            "domain": page.domain,
            "last_visited": page.last_visited,
            "s3": page.s3,
          }
        });
        catsToPagesDict[category.title] = pagesToCatsDict;
      });
      var starredPagesDict = {};
      action.json.starred.map(function(page) {
        starredPagesDict[page.pk] = {
          "pk": page.pk,
          "title": page.title,
          "url": page.url,
          "star": page.star,
          "categories": page.categories,
          "created": page.created,
          "domain": page.domain,
          "last_visited": page.last_visited,
          "s3": page.s3,
        };
      });
      return {catsToPages: catsToPagesDict, starred: starredPagesDict, showStarred: state.showStarred};
    case types.TOGGLE_SHOW_STARRED:
      return {...state, showStarred: !state.showStarred};
    default:
      return state;
  }
}

export default categoryPagesReducer;
