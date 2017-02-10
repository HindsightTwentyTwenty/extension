import * as types from '../constants/ActionTypes';

function categoryPagesReducer(state = {catsToPages: {}, starred: {}, showStarred: false}, action){
  switch(action.type){
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
            "created": page.created
          }
        });
        catsToPagesDict[category.title] = pagesToCatsDict;
      });
      return {catsToPages: catsToPagesDict, starred: {}, showStarred: state.showStarred};
    case types.TOGGLE_SHOW_STARRED:
      return {...state, showStarred: !state.showStarred};
    default:
      return state;
  }
}

export default categoryPagesReducer;
