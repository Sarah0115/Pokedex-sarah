import { createStore } from 'vuex';
import PokeAPIService from '../services/pokeapi';

export default createStore({
  state: {
    pokemonList: JSON.parse(localStorage.getItem('pokemonList')) || [],
    selectedPokemon: null,
    showOnlyFavorites: false
  },
  mutations: {
     SET_POKEMON_LIST(state, list) {
        state.pokemonList = list;
        localStorage.setItem('pokemonList', JSON.stringify(state.pokemonList));

     },
    TOGGLE_FAVORITE(state, pokemonName) {
        const pokemon = state.pokemonList.find(p => p.name === pokemonName);
        if (pokemon) {
            pokemon.favorite = !pokemon.favorite;
            localStorage.setItem('pokemonList', JSON.stringify(state.pokemonList));
       }
    },    
    TOGGLE_SHOW_ONLY_FAVORITES(state) {
      state.showOnlyFavorites = !state.showOnlyFavorites;
    },
    SET_SELECTED_POKEMON(state, pokemon) {
      state.selectedPokemon = pokemon;
    },
  },
  actions: {
    async fetchPokemonList({ commit }) {
     
      try {
        const response = await PokeAPIService.getPokemonList();
        const pokemonList = response.map(pokemon => ({
          ...pokemon,
          favorite: false,
          id: pokemon.url.split('/')[6]
        }));
        if(!localStorage.getItem('pokemonList')) {
            commit('SET_POKEMON_LIST', pokemonList);
        }
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    },
    
    async fetchPokemonDetails({ commit, state}, pokemonName) {
      try {
        const details = await PokeAPIService.getPokemonDetails(pokemonName);

        const mappedDetails = {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          weight: details.weight,
          height: details.height,
          types: details.types.map(t => t.type.name).join(', '),
          favorite: state.pokemonList.find(p => p.name === pokemonName)?.favorite || false,
        };
        
        commit('SET_SELECTED_POKEMON', mappedDetails);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    }
  }
});