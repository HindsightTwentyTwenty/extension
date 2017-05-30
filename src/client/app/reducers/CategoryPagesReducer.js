import * as types from '../constants/ActionTypes';

function pageObject(page) {
  return {
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
}

function categoryPagesReducer(state = {catsToPages: {}, starred: {}, showStarred: false}, action){
  switch(action.type){
    case types.TOGGLE_STAR:
      var catsToPagesDict = Object.assign({}, state.catsToPages);
      var starredPagesToCatsDict = Object.assign({}, state.starred);
      var page = action.page;
      var addStar = true;
      if (starredPagesToCatsDict[page.pk]) {
        delete starredPagesToCatsDict[page.pk];
        addStar = false;
      } else {
        starredPagesToCatsDict[page.pk] = pageObject(page);
      }
      for (let cat in catsToPagesDict) {
        if (catsToPagesDict[cat][page.pk]) {
          catsToPagesDict[cat][page.pk].star = addStar;
        }
      }
      return {...state, catsToPages: catsToPagesDict, starred: starredPagesToCatsDict};
    case types.REMOVE_CAT_FROM_PAGE:
      console.log("OTHER REMOVE CAT??");
      var newPageInfo = action.json
      console.log("new page info");
      var removedCat = action.categoryTitle;
      var catsToPagesDict = Object.assign({}, state.catsToPages);
      for (let cat in catsToPagesDict) {
        if (cat == removedCat) {
          delete catsToPagesDict[cat][newPageInfo.pk];
        }
        else if (catsToPagesDict[cat][newPageInfo.pk]) {
          catsToPagesDict[cat][newPageInfo.pk] = newPageInfo;
        }
      }
      return {...state, catsToPages: catsToPagesDict};
    case types.RECEIVE_CATEGORIES_AND_PAGES:
      var catsToPagesDict = {};
      action.json.categories.map(function(category) {
        var pagesToCatsDict = {};
        category.pages.map(function(page) {
          pagesToCatsDict[page.pk] = pageObject(page);
        });
        catsToPagesDict[category.title] = pagesToCatsDict;
      });
      var starredPagesToCatsDict = {};
      action.json.starred.map(function(page) {
        starredPagesToCatsDict[page.pk] = pageObject(page);
      });
      return {...state, catsToPages: catsToPagesDict, starred: starredPagesToCatsDict};
    case types.TOGGLE_SHOW_STARRED:
      return {...state, showStarred: !state.showStarred};
    default:
      return state;
  }
}

export default categoryPagesReducer;
