import { API_URL } from './config'
import { getJSON } from './helpers'

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  }
}

export const loadRecipe = async function(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`)

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
    };
  
  } catch(err) {
    throw err;
  }
}

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`)

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      }
    })

  } catch(err) {
    throw err;
  }
}