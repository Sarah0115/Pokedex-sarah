<template>
  <div class="pokedex-search"> 
    <img class="pokedex-search__icon" src="../assets/img/search.svg" alt="Search" />
    <input
      class="pokedex-search__input"
      type="text"
      placeholder="Search"
      v-model="searchQuery"
    />
    <button
      class="pokedex-search__clear-button"
      @click="clearSearch"
      v-if="searchQuery"
    >
      x
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' }
  },
  data() {
    return {
      searchQuery: this.value
    };
  },
  watch: {
    value(newVal) {
      this.searchQuery = newVal;
    },
    searchQuery(newVal) {
      this.$emit('input', newVal);
      this.$emit('search', newVal);
    }
  },
  methods: {
    clearSearch() {
      this.searchQuery = '';
      this.$emit('input', '');
      this.$emit('search', '');
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles.scss';

.pokedex-search {
  display: flex;
  align-items: center;
  background-color: $white;
  padding: 0 15px;
  color: $secondary-color;
  height: 50px;
  &__icon {
    margin-right: 10px;
  }

  &__input {
    width: 100%;
    margin: 10px 0;
    border: 1px solid transparent;
    border-radius: 4px;
    color: $secondary-color;
    font-size: 16px;

    &:focus {
      outline: none;
      box-shadow: none;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset;
      -webkit-text-fill-color: black;
    }
  }

  &__clear-button {
    background-color: $white;
    color: $secondary-color;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-left: 10px;
  }
}
@media (max-width: 600px){
    

}
</style>