import * as model from './model'
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

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
    resultsView.render(model.state.search.results)

  } catch(err){
    console.error(err);
  }
}


const init = function() {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}

init();