<template>
  <div class="Pokedex-favorites">
    <div class="Pokedex-favorites__container">
    <button @click="toggleShowAll" :disabled="!showOnlyFavorites" class="button-base">
      <img src="../assets/img/list.svg"/>
      All
    </button>
    <button @click="toggleShowFavorites" :disabled="showOnlyFavorites" class="button-base">
      <img src="../assets/img/star.svg" />
      Favorites
    </button>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    showOnlyFavorites: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleShowFavorites() {
      this.$emit('update:show-only-favorites', true);
    },
    toggleShowAll() {
      this.$emit('update:show-only-favorites', false);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles.scss';

.Pokedex-favorites {
  position: fixed;
  height: 80px;
  bottom: 0px;
  left: 0px;
  width:100%;
  background-color: $white;
 
  box-shadow: -0 -7px 8px -4px rgba(200, 200, 200, 0.87);
-webkit-box-shadow: -0 -7px 8px -4px rgba(200, 200, 200,0.87);
-moz-box-shadow: -0 -7px 8px -4px rgba(200, 200, 200,0.87);
display:flex;
justify-content:center;
&__container{
  width:600px;
  display: flex;
  align-items: center;
  max-width: 100%;
   gap:20px;
}
  button{
    flex-grow: 1;
    display:flex;
    align-items: center;
    justify-content:center;
    gap: 10px;
    img { 
      width: 22px;
      height: 22px;
    }
  }
}
button:disabled {
  
  background-color: $primary-color;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
 
  background-color: $secondary-color;
}
@media (max-width: 600px){
    .Pokedex-favorites {
      .Pokedex-favorites__container{
        padding: 18px 30px;
        button{
          max-width: 150px;
        }
      }
    }

}
</style>