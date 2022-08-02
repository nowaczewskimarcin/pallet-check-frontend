<template>
  <div id="app">
    <nav>

      <div v-for="pallet in pallets" :key="pallet.id"> {{ pallet.id }} - {{ pallet.number }}</div>

      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      pallets: null,
    }
  },
  methods: {
    fetchDailyPallets() {
      fetch('api/dailyPallets')
        .then((response) => response.json())
        .then((json) => this.pallets = json)
    }
  },
  mounted() {
    this.fetchDailyPallets();
  }
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>


