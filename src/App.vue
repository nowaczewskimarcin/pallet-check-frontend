<template>
  <v-app>
    <v-app-bar app color="primary" dark>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
html,
.v-application--wrap{
  height: 100vh;
  overflow: hidden;
}
.v-main{
  height: 100%;
  overflow: hidden;
}
</style>