<template>

    <v-card class="mx-auto" max-width="1000">
        <v-card-title :palletNumber="palletNumber">Produkty na palecie o numerze: {{ palletNumber }}
        </v-card-title>
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
                            <td>{{ product.name }}</td>
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
        palletNumber: {
            required: true,
            type: String,
        }
    },
    data() {
        return {
            products: [
                { name: "Słuchawki", size: "małe", amount: 0 }, { name: "Kierownica", size: "duże", amount: 0 },
                { name: "Klawiatura", size: "duże", amount: 0 }, { name: "Joystick", size: "małe", amount: 0 },
                { name: "Mysz", size: "małe", amount: 0 }, { name: "Podkładka pod mysz", size: "duże", amount: 0 },
                { name: "Głośniki", size: "duże", amount: 0 }, { name: "Kabel HDMI", size: "duże", amount: 0 },
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