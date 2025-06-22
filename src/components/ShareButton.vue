<template>
  <button @click="copyToClipboard" class="share-button">
    Share
  </button>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  methods: {
    copyToClipboard() {
      const attributes = [
        this.pokemon.name,
        this.pokemon.types.map(t => t.type.name).join(', '),
        this.pokemon.abilities.map(a => a.ability.name).join(', ')
      ];
      const textToCopy = attributes.join(', ');
      
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert('Texto copiado al portapapeles!');
        })
        .catch(err => {
          console.error('Error al copiar:', err);
        });
    }
  }
};
</script>

<style scoped>
.share-button {
  background-color: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}
</style> 
