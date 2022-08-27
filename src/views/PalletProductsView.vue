<template>

    <v-card class="mx-auto" max-width="1000">
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
                        <tr v-for="product in products" :key="product.id">
                            <td> {{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td> {{ product.id }}</td>
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
            products: [
                { id: 1, name: "Słuchawki" }, { id: 2, name: "Klawiatura" },
                { id: 3, name: "Mysz" }, { id: 4, name: "Głośniki" },

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