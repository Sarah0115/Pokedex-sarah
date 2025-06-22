<template>
  <div class="no-results">
    <h2>Uh-oh!</h2>
    <p>You look lost on your journey!</p>
    <button class="button-base button-primary" @click="clearSearch">Go back home</button>
  </div>
</template>

<script>
export default {
  methods: {
    clearSearch() {
      this.$emit('clear-search');
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles.scss';
.no-results {
  text-align: center;
  margin-top: 50px;
  color: $text-color;
  p{
    margin-bottom: 36px;
  }
}
</style>