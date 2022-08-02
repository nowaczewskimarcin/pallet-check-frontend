<template>
  <v-app>
    <v-app-bar app color="primary" dark>

      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div v-for="pallet in pallets" :key="pallet.id"> {{ pallet.id }} - {{ pallet.number }}</div>
      <router-view />
    </v-main>
  </v-app>
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