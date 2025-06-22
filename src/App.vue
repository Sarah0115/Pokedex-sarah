<template>
  <div id="app">
      <WelcomeApp v-if="!isStarted" @start="start" /> 
     
      <PokemonListPage v-else />
    </div>

</template>

<script>
import WelcomeApp from './components/WelcomeApp.vue';
import PokemonListPage from './components/PokemonListPage.vue';

export default {
  components: {
    WelcomeApp,
    PokemonListPage
  },
  data() {
    return {
      isStarted: false
    };
  },
  methods: {
    start() {
      this.isStarted = true;
    }
  }
};
</script>
<style scoped  lang="scss">
@import '@/assets/styles.scss';
#app {
  background-color: $background-color;
  min-height: 100vh;
  padding-top: 35px;
}
</style>