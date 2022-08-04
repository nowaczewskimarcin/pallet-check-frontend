<template>
    <v-card class="mx-auto" max-width="1000" tile>
        <v-card-title>Paleta nr</v-card-title>
        <v-card-title></v-card-title>
    </v-card>

</template>
<script>

export default {
    name: 'PalletCheckView',
    data() {
        return {
            pallets: null,
            errorMessage: null,
            selectedItem: null,
        }
    },
    methods: {
    }
}
</script>