export default {
  async getPokemonList() {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=150'
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      throw error;
    }
  },

  async getPokemonDetails(name) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching details for Pokémon ${name}:`, error);
      throw error;
    }
  }
};