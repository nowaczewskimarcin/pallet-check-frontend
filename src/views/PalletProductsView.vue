<template>
    <v-card class="mx-auto" max-width="1000">
        <v-card-title>Produkty na palecie numer: </v-card-title>
        <v-container class="mb-3 pa-md-5 mx-lg-auto">
            <v-divider></v-divider>

            <v-list class="scroll" v-for="(product, index) in products" :key="product.index">
                <v-list-item-group color="primary">

                    <v-list-item dense>
                        <v-list-item-content>
                            <v-list-item-title>
                                Pozycja. {{ index + 1 }} | {{ product.aaa }} Rozmiar: {{ product.size }} - ilość: {{
                                        product.amount
                                }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-divider></v-divider>

            <v-card-actions class="text-center">
                <v-btn>Anuluj</v-btn>
                <v-btn color="success" class="mr-4">
                    Zatwierdź
                </v-btn>

            </v-card-actions>
        </v-container>
    </v-card>

</template >
<script>
export default {
    name: 'PalletProductsView',
    props: {
        palletId: {
            required: true,
            type: String
        },
        palletNumber: {
            required: true,
            type: Number
        }
    },
    data() {
        return {
            palletNumber: null,
            products: [
                { aaa: "Słuchawki", size: "małe", amount: 0 }, { aaa: "Kierownica", size: "duże", amount: 0 },
                { aaa: "Klawiatura", size: "duże", amount: 0 }, { aaa: "Joystick", size: "małe", amount: 0 },
                { aaa: "Mysz", size: "małe", amount: 0 }, { aaa: "Podkładka pod mysz", size: "duże", amount: 0 },
                { aaa: "Głośniki", size: "duże", amount: 0 }, { aaa: "Kabel HDMI", size: "duże", amount: 0 },
                { aaa: "Monitor", size: "duże", amount: 0 }, { aaa: "Mocowanie monitora", size: "duże", amount: 0 },
            ]
        }
    },
    methods: {
    },
    mounted() {
    },
}
</script>

<style scoped>
</style>