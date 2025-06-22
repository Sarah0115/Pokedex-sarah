<template>
  <div class="pokemon-list-page">
    <PokeLoader v-if="loading" />
    <div v-else>
      <div class="pokemon-list-page__container">
        <SearchBar
          ref="searchBar"
          @search="handleSearch"
          v-model="searchQuery"
        />
      <div v-if="!filteredPokemonList.length && searchQuery"
          class="pokemon-list-page__no-results-container"
        >
          <NoResults @clear-search="clearSearch" />
        </div>
        <div  class="pokemon-list-page__pokemon-list">
          <div
            v-for="pokemon in filteredPokemonList"
            :key="pokemon.name"
            class="pokemon-list-page__pokemon-card"
            @click="selectPokemon(pokemon.name)"
          >
            <h3>{{ pokemon.name }}</h3>
            <button
            class="favorite-button"
            :class="{ isFav: pokemon.favorite }"
            @click.stop="toggleFavorite(pokemon.name)"
          >
          </button>
          </div>
        </div>
      </div>
      <FilterBox
        :show-only-favorites="showOnlyFavorites"
        @update:show-only-favorites="toggleShowOnlyFavorites"
      />
  </div>
    <PokemonDetailsModal
      v-if="selectedPokemon"
      :pokemon="selectedPokemon"
      @close="closeModal"
      @toggle-favorite-modal="toggleFavorite"
    />
  </div>
</template>

<script>
import FilterBox from './FilterBox.vue';
import PokeLoader from './PokeLoader.vue';
import NoResults from './NoResults.vue';
import PokemonDetailsModal from './PokemonDetailsModal.vue';
import SearchBar from './SearchBar.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    FilterBox,
    PokeLoader,
    NoResults,
    PokemonDetailsModal,
    SearchBar,
  },
  data() {
    return {
      loading: false,
      searchQuery: ''
    };
  },
  computed: {
    ...mapState(['pokemonList', 'showOnlyFavorites', 'selectedPokemon']),
    filteredPokemonList() {
      let filteredList = this.pokemonList;

      if (this.showOnlyFavorites) {
        filteredList = filteredList.filter(pokemon => pokemon.favorite);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filteredList = filteredList.filter(pokemon =>
          pokemon.name.toLowerCase().includes(query)
        );
      }

      return filteredList;
    }
  },
  methods: {
    ...mapActions(['fetchPokemonList', 'fetchPokemonDetails']),
   async fetchPokemon() {
  this.loading = true;
  try {
    // Introduce a 2-second delay to show the animation only
    await new Promise(resolve => setTimeout(resolve, 3000));
    await this.fetchPokemonList();
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
  } finally {
    this.loading = false;
  }
},
    clearSearch() {
      this.searchQuery = '';
      this.$refs.searchBar.clearSearch();
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    async selectPokemon(pokemonName) {
      try {
        await this.fetchPokemonDetails(pokemonName);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    },
    closeModal() {
      this.$store.commit('SET_SELECTED_POKEMON', null);
    },
    toggleFavorite(pokemonName) {
      this.$store.commit('TOGGLE_FAVORITE', pokemonName);
    },
    toggleShowOnlyFavorites() {
      this.$store.commit('TOGGLE_SHOW_ONLY_FAVORITES');
    },
  },
  mounted() {
    this.fetchPokemon();
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles.scss';

.pokemon-list-page {
  position: relative;
  padding: 0 15px;
  font-family: $font;

  &__container {
    max-width: 600px;
    width: 600px;
    margin: 0 auto;
  }

  &__loading {
    text-align: center;
    margin-top: 50px;
  }

  &__pokemon-list {
    padding-bottom: 90px;
  }

  &__pokemon-card {
    font-size:22px;
    height:60px;
    background-color: $white;
    text-transform: capitalize;
    color: $text-color;
    padding: 0px 20px;
    margin: 10px 0;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: $font-medium;

  
  }

  &__no-results-container {
    text-align: center;
    margin-top: 50px;
    color: #888;
  }
}

@media (max-width: 600px){
  .pokemon-list-page {
    position: relative;
    padding: 0 30px;
    font-family: $font;

    &__container {
      max-width: 100%;
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>