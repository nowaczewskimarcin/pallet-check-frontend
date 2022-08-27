<template>

    <v-card class="mx-auto" max-width="1000" :loading="loading">
        <v-card-title>Paleta do sprawdzenia o numerze:</v-card-title>
        <v-container class="mb-3 pa-md-5 mx-lg-auto">

            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Pozycja
                            </th>
                            <th class="text-left">
                                Nazwa produktu
                            </th>
                            <th class="text-left">
                                Ilość
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="product.index">
                            <td> {{ index + 1 }}</td>
                            <td>{{ product.aaa }}</td>
                            <td> {{ product.amount }}</td>
                        </tr>
                    </tbody>
                </template>

            </v-simple-table>
        </v-container>
    </v-card>

</template>

<script>
export default {
    name: 'PalletProductsView',
    props: {
    },
    data() {
        return {
            palletNumber: null,
            products: [
                { aaa: "Słuchawki", size: "małe", amount: 0 }, { aaa: "Kierownica", size: "duże", amount: 0 },
                { aaa: "Klawiatura", size: "duże", amount: 0 }, { aaa: "Joystick", size: "małe", amount: 0 },
                { aaa: "Mysz", size: "małe", amount: 0 }, { aaa: "Podkładka pod mysz", size: "duże", amount: 0 },
                { aaa: "Głośniki", size: "duże", amount: 0 }, { aaa: "Kabel HDMI", size: "duże", amount: 0 },
            ],

        }
    },
    methods: {
    },
    computed: {
    },
    mounted() {
    },
}
</script>

<style scoped>
</style>