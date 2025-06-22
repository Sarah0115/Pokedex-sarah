<template>
  <div class="welcome">
    <img src="../assets/img/Home.png">
    <h1>Welcome to Pokédex</h1>
    <p>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
    <button @click="start" class="button-base button-primary">Get Started</button>
  </div>
</template>

<script>
export default {
  methods: {
    start() {
     this.$emit('start');
    }
  }
};
</script>

<style scoped  lang="scss">
@import '@/assets/styles.scss';
.welcome {
  width: 600px;
  margin:auto;
  text-align: center;
  font-family: $font;
  padding: 50px 15px;
   h1 {

    font-weight: $font-bold;
    font-style: normal;
    font-size: 26px;
    color: #333;
    margin-bottom: 50px;
  }
  p{
    font-weight: $font-medium;
    font-style: normal;
    font-size: 18px;
    line-height: 1.5;
    margin: 0 0 30px;
  }

 
}
@media (max-width: 600px){
  .welcome{
    max-width: 100%;
    width: 100%;
    padding: 50px 0;
  }
}
</style>