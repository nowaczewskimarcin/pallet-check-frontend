<template>

    <v-card class="mx-auto" max-width="1000">
        <v-container class="mb-3 pa-md-5 mx-lg-auto">

            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Numer
                            </th>
                            <th class="text-left">
                                Nazwa produktu
                            </th>
                            <th class="text-left">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td> {{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </template>

            </v-simple-table>
        </v-container>
    </v-card>

</template>

<script>
import axios from 'axios';
export default {
    name: 'PalletProductsView',
    props: {
        palletId: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            products: [],

        }
    },
    methods: {
        async fetchProducts() {
            const response = await axios.get('/api/pallets/' + this.palletId + '/products');
            this.products = response.data;
            console.log(this.products);
        },
    },
    computed: {
    },
    async mounted() {
        await this.fetchProducts();
    },
}
</script>

<style scoped>
</style>