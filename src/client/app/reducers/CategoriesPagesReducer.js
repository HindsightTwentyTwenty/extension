import * as types from '../constants/ActionTypes';

function categoryObject(category) {
  var categoryInfo = {};
  categoryInfo.title = category.title;
  categoryInfo.color = category.color;
  categoryInfo.pages = new Set(category.pages);
  return categoryInfo;
}

function pageObject(page) {
  var pageInfo = {};
  pageInfo.categories = new Set(page.cat_pks);
  pageInfo.created = page.created;
  pageInfo.domain = page.domain;
  pageInfo.lastVisited = page.last_visited;
  pageInfo.s3 = page.s3;
  pageInfo.star = page.star;
  pageInfo.title = page.title;
  pageInfo.url = page.url;
  return pageInfo;
}

function categoriesPagesReducer(state = {categories: {}, pages: {}, starred: {}}, action){
  switch(action.type){
    case types.RECEIVE_CATEGORIES_AND_PAGES:
      var categories = {};
      var pages = {};
      var starred = new Set(action.json.starred);

      action.json.categories.map(function(category) {
        categories[category.pk] = categoryObject(category);
      });

      action.json.pages.map(function(page) {
        pages[page.pk] = pageObject(page);
      });
      return {categories: categories, pages: pages, starred: starred};

    case types.UPDATE_CATEGORY:
      var pk = action.pk;
      var categories = Object.assign({}, state.categories);
      if (categories[pk]) {
        categories[pk].title = action.title;
        categories[pk].color = action.color;
      }
      return {...state, categories: categories};

    case types.DELETE_CATEGORY:
      var categories = Object.assign({}, state.categories);
      var pages = Object.assign({}, state.pages);
      var pk = action.pk;
      if (categories[pk]) {
        for (let pagePk of categories[pk].pages) {
          if (pages[pagePk].categories.has(pk)) {
            pages[pagePk].categories.delete(pk);
            delete pages[pagePk].categories[pk];
          }
        }
        delete categories[pk];
      }
      return {...state, categories: categories, pages: pages};

    case types.TOGGLE_STAR:
      var starred = Object.assign({}, state.starred);
      var pages = Object.assign({}, state.pages);
      var pk = action.pagePk;
      var addStar = true;
      if (starred.has(pk)) {
        starred.delete(pk);
        addStar = false;
      } else {
        starred.add(pk);
      }
      pages[pk].star = addStar;
      return {...state, pages: pages, starred: starred};

    case types.REMOVE_CAT_FROM_PAGE:
      var categoryPk = action.categoryPk;
      var pagePk = action.pagePk;
      var categories = Object.assign({}, state.categories);
      var pages = Object.assign({}, state.pages);
      if(categories[categoryPk] && categories[categoryPk].pages.has(pagePk)) {
        categories[categoryPk].pages.delete(pagePk);
      }
      if(pages[pagePk] && pages[pagePk].categories.has(categoryPk)) {
        pages[pagePk].categories.delete(categoryPk);
      }
      return {...state, categories: categories, pages: pages};
    default:
      return state;
  }
}

export default categoriesPagesReducer;
