<template>
  <div v-if="pokemon" class="pokedex-modal">
    <div class="pokedex-modal-content">
      <div class="pokedex-modal-content__header">
        <div class="close" @click="$emit('close')"></div>

         <img :src="pokemon.image" :alt="pokemon.name" />
      
      </div>
      <div class="pokedex-modal-content__body">
        <ul class="podedex-modal-content__data-list">
          <li><strong>Name: </strong>{{ pokemon.name }}</li>
          <li><strong>Weight: </strong> {{ pokemon.weight }}</li>
          <li><strong>Height: </strong> {{ pokemon.height }}</li>
          <li><strong>Types: </strong> {{ pokemon.types}}</li>
        </ul>
      <div class="pokedex-modal-content__footer">
      <button @click="copyToClipboard" class="button-base button-primary">Share to my friends</button>
      <button @click="toggleFavorite"
        class="favorite-button"
        :class="{ isFav: localPokemon.favorite }"
       ></button>
      </div>
      
      </div>
  
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
    data() {
    return {
      localPokemon: { ...this.pokemon }
    };
  },
  methods: {
    copyToClipboard() {
      const attributes = [
        this.pokemon.name,
        this.pokemon.types,
        this.pokemon.weight,
        this.pokemon.height
      ];
      const textToCopy = attributes.join(', ');
      navigator.clipboard.writeText(textToCopy)
    },
     toggleFavorite() {
       this.localPokemon.favorite = !this.localPokemon.favorite;
      this.$emit('toggle-favorite-modal', this.pokemon.name);
    }

  }
};
</script>

<style scoped lang="scss">

@import '@/assets/styles.scss';
.pokedex-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.pokedex-modal-content {
  max-width: 570px;
  width: 570px;
  background-color: #fefefe;
  margin: 15% auto;
  border-radius: 5px;
  width: 80%;
  overflow: hidden;
  
  &__header{
    height: 220px;
    background-image: url('../assets/img/pokemon-background.png');
    background-size: 120% 100%;
    background-repeat: no-repeat;
    display: flex;
    position: relative;
    justify-content: center;
    img{
      max-height: 220px;
    }
  }
  &__body{
    padding: 20px 30px;
    .podedex-modal-content__data-list{
      padding: 0;
      margin: 0;
      list-style-type: none;
      li{
         padding: 10px 0;
        border-bottom: 1px solid $light-gray;
        text-transform: capitalize;
      }
    }
  }
  &__footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

}
.close {
    position: absolute;
  right: 15px;
  top:15px;
  width: 26px;
  height: 26px;
  background-image: url('../assets/img/close.svg');
  background-size: 100%;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>