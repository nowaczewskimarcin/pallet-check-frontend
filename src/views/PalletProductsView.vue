<template>

    <v-card class="mx-auto" max-width="1000" :loading="loading">
        <v-container class="mb-3 pa-md-5 mx-lg-auto">

            <v-responsive class="overflow-y-auto" max-height="calc(90vh - 150px)">
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
                                    <v-text-field v-model.number="product.quantity" type="number" required
                                        placeholder="Wpisz ilość produktu">
                                    </v-text-field>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-responsive>

            <v-divider></v-divider>
            <v-card-actions class="text-center d-flex">
                <v-btn @click="backToPrevious">Anuluj</v-btn>
                <v-btn color="success" class="mr-4" @click="sendToBackend">
                    Zapisz
                </v-btn>
                <v-btn class="mr-4 ml-auto" @click="addProduct()">
                    <v-icon left>
                        mdi-file-plus
                    </v-icon>
                    Dodaj produkt
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

                <v-dialog v-model="dialog" scrollable max-width="600px">
                    <v-card>

                        <v-card-title>
                            <span class="text-h5">Dodaj produkt do palety</span>
                        </v-card-title>
                        <v-subheader>WYBIERZ PRODUKT</v-subheader>
                        <v-card-text>
                            <v-list dense>
                                <v-list-item-group v-model="selectedItem" color="primary">
                                    <v-list-item v-for="product in productName" :key="product.id">
                                        <v-list-item-content>
                                            <v-list-item-title v-text="product.name">
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card-text>
                        <v-spacer></v-spacer>
                        <v-card-actions>
                            <v-btn color="blue darken-1" text @click="dialog = false">
                                Anuluj
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="addProductToList()">
                                Dodaj
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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
            products: [{ id: null, quantity: 0 }],
            snackbar: false,
            loading: false,
            dialog: false,
            selectedItem: null,
            productName: [],
        }
    },
    methods: {
        async fetchProducts() {
            this.loading = true;
            const response = await axios.get('/api/pallets/' + this.palletId + '/products');
            this.products = response.data;
            this.products.sort((a, b) => a.id - b.id);
            this.loading = false;
        },
        addProductToList() {
            const selectedProduct = this.productName[this.selectedItem];
            this.products.push({ id: null, name: selectedProduct.name, quantity: 0 });
            console.log(this.products);
            this.dialog = false;
        },
        async addProduct() {
            try {
                this.loading = true;
                this.dialog = true;
                const response = await axios.get('/api/pallets/' + this.palletId + '/products/available')
                this.productName = response.data;
            }
            catch (err) {
                if (err.response.status == 409) {
                    this.snackbar = true;
                }
            }
            finally {
                this.loading = false;
            }
        },
        goToConfirm() {
            this.snackbar = false;
            this.$router.push({ name: 'ConflictView', params: { palletId: this.palletId } });
        },
        async sendToBackend() {
            try {
                this.loading = true;
                await axios.post('/api/pallets/' + this.palletId + '/products', this.products.map(x => {
                    if (x.id == null) {
                        return { name: x.name, quantity: x.quantity };
                    }
                    else {
                        return { id: x.id, quantity: x.quantity };
                    }
                }
                ));
            }
            catch (err) {
                if (err.response.status == 409) {
                    this.snackbar = true;
                }
                if (err.response.status == 400) {
                    alert('Błąd z serwera: ERROR 400: BAD REQUEST');
                }
            }
            finally {
                this.loading = false;
            }
        },
        backToPrevious() {
            this.$router.push({ name: 'palletsSelect' });
        }
    },
    async mounted() {
        await this.fetchProducts();
    }
}
</script>

<style scoped>

</style>