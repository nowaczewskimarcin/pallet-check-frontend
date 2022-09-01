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
                            <td>
                                <v-text-field v-model="product.actualQuantity" required
                                    placeholder="Wpisz ilość produktu"></v-text-field>
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
            <div class="text-center">
                <v-snackbar centered v-model="snackbar" color="red">
                    Wprowadzone wartości są niezgodne z deklarowanymi, proszę o ponowne <strong>sprawdzenie ilości
                        produktów</strong>

                    <template v-slot:action="{ attrs }">
                        <v-btn color="white" text v-bind="attrs" @click="goToConfirm">
                            Sprawdź ponownie
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>
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
            products: [{ id: null, name: '', actualQuantity: 0 }],
            snackbar: false,
        }
    },
    methods: {
        async fetchProducts() {
            const response = await axios.get('/api/pallets/' + this.palletId + '/products');
            this.products = response.data;
            this.products.sort((a, b) => a.id - b.id);
            console.log(this.products);
        },
        goToConfirm() {
            this.snackbar = false;
            this.$router.push('/conflict/' + this.palletId);
        },
        async sendToBackend() {
            try {
                await axios.post('/api/pallets/' + this.palletId + '/products', this.products);
            }
            catch (err) {
                if (err.response.status == 409) {
                    console.log('Błąd 409, wpisne wartości różnią się od deklarowanych.')
                    this.snackbar = true;

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