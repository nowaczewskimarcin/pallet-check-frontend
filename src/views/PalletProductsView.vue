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
                                Ilość
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="product.id">
                            <td> {{ index + 1 }}</td>
                            <td>{{ product.name }}</td>
                            <td><input v-model="product.actualQuantity" required placeholder="Wpisz ilość produktu" />
                            </td>
                        </tr>
                    </tbody>
                </template>

            </v-simple-table>
            <v-divider></v-divider>
            <v-card-actions class="text-center">
                <v-btn>Anuluj</v-btn>
                <v-btn color="success" class="mr-4" @click="sendToBackend">
                    Wyślij do sprawdzenia
                </v-btn>
            </v-card-actions>
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
            n: 0,
            products: [{ id: 1, name: '', declaredQuantity: 0, actualQuantity: 0 },
            { id: 2, name: '', declaredQuantity: 0, actualQuantity: 0 }
            ],
        }
    },
    methods: {
        async fetchProducts() {
            const response = await axios.get('/api/pallets/' + this.palletId + '/products');
            this.products = response.data.map(x => { return { ...x, declaredQuantity: null, actualQuantity: null } });
            this.products.sort((a, b) => a.id - b.id);
            console.log(this.products);
        },
        async sendToBackend() {
            try {
                await axios.post('/api/pallets/' + this.palletId + '/products/confirm', this.products);
            }
            catch (err) {
                if (err.response.status == 405) {
                    console.log('Błąd 405, nie wprowadzono potrzebnych informacji.')
                }
            }
            finally {
            }
        },
    },
    async mounted() {
        await this.fetchProducts();
    },
}
</script>

<style scoped>
</style>