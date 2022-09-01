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
                                Wpisz ilość towaru
                            </th>
                            <th class="text-left">
                                Deklarowana ilość
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in productsFromServer" :key="product.id">
                            <td> {{ index + 1 }}</td>
                            <td>{{ product.name }}</td>
                            <td><input v-model="productsFromServer[index].actualQuantity" required
                                    placeholder="Wpisz ilość produktu" />
                            </td>
                            <td>{{ product.declaredQuantity }}
                            </td>
                        </tr>
                    </tbody>
                </template>

            </v-simple-table>
            <v-divider></v-divider>
            <v-card-actions class="text-center">
                <v-btn @click="backToPrevous">Anuluj</v-btn>
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
    name: 'ConflictView',
    props: {
        palletId: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            productsFromServer: [],
        }
    },
    methods: {
        async fetchProductsFromServer() {
            const responseFromServer = await axios.get('/api/pallets/' + this.palletId + '/products/confirm');
            this.productsFromServer = responseFromServer.data;
            this.productsFromServer.sort((a, b) => a.id - b.id);
            console.log(this.productsFromServer);
        },
        async sendToBackend() {
            try {
                await axios.post('/api/pallets/' + this.palletId + '/products/confirm', this.productsFromServer);
            }
            catch (err) {
                if (err.response.status == 409) {
                    console.log('Błąd 409, wpisne wartości różnią się od deklarowanych.')
                }
            }
            finally {
            }
        },
        backToPrevous() {
            this.$router.push('/palletcheck/palletproductsview/' + this.palletId);
        },
    },
    async mounted() {
        await this.fetchProductsFromServer();
    },
}
</script>

<style scoped>
</style>