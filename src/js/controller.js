import * as model from './model'
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;

    recipeView.renderSpinner();

    // update results selected mark
    resultsView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)

    //

    // loading recipe
    await model.loadRecipe(id)

    // rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (err) {
    console.error(err);
    recipeView.renderError()
  }
};

const controlSearchResults = async function() {
  try{
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    if(!query) return;

    // load 
    await model.loadSearchResults(query)

    // render
    resultsView.render(model.getSearchResultsPage())

    // render pagination
    paginationView.render(model.state.search)

  } catch(err){
    console.error(err);
  }
}

const controlPagination = function(gotoPage) {
  // render new results
  resultsView.render(model.getSearchResultsPage(gotoPage))

  // render new pagination
  paginationView.render(model.state.search)
}

const controlServings = function(newServings) {
  // update the recipe servings(in state)
  model.updateServings(newServings)

  // update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function() {
  // add or remove bookmark
  if(!model.state.recipe.bookmarked) 
    model.addBookmark(model.state.recipe)
  else 
    model.deleteBookmark(model.state.recipe.id)

  // update recipe view
  recipeView.update(model.state.recipe)

  // render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}

init();