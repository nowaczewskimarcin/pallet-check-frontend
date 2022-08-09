<template>

    <v-card class="mx-auto" max-width="1000" tile :loading="loading">
        <v-card-title>Palety w kolejce</v-card-title>
        <v-divider></v-divider>

        <v-list class="scroll">
            <v-list-item-group v-model="selectedPallet" color="primary">

                <v-list-item v-for="pallet in pallets" :key="pallet.id" dense>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ pallet.number }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
            <v-btn text depressed :disabled="selectedPallet == null" @click="goToPalletCheck">
                <v-icon left>
                    mdi-arrow-right-bold
                </v-icon>Przejdź do kontroli palety
            </v-btn>
            <v-btn text @click="generateAndFetchPallets" :disabled="loading">
                <v-icon left>
                    mdi-playlist-plus
                </v-icon>Wygeneruj nowe palety
            </v-btn>
        </v-card-actions>

        <v-snackbar color="red" :value="errorMessage != null" @input="onSnackbarInput">
            {{ errorMessage }}

            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="errorMessage = null">
                    Zamknij
                </v-btn>
            </template>
        </v-snackbar>
    </v-card>

</template>
<script>
export default {
    name: 'PalletsSelectView',
    props: {
        singlePallet: Number,
        required: true,
    },
    data() {
        return {
            pallets: null,
            errorMessage: null,
            selectedPallet: null,
            loading: false,
        }
    },
    methods: {
        async fetchDailyPallets() {
            const response = await fetch('api/dailyPallets');
            const json = await response.json();
            this.pallets = json;
        },
        goToPalletCheck() {
            const singlePallet = this.pallets[this.selectedPallet].number;
            this.$router.push('/palletcheck/' + singlePallet);
        },
        async generateNewPallets() {
            const response = await fetch('api/dailyPallets', {
                method: 'POST'
            });
            if (response.status == 400) {
                const json = await response.json();
                this.errorMessage = json.errorMessage;
            }
        },
        onSnackbarInput(onSnackbarValue) {
            if (onSnackbarValue == false) {
                this.errorMessage = null;
            }
        },
        async generateAndFetchPallets() {
            this.loading = true;
            try {
                await this.generateNewPallets();
                await this.fetchDailyPallets();
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchDailyPallets();
    },
}
</script>

<style scoped>
.v-card {
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
}

.v-list {
    flex-grow: 1;
    flex-shrink: 1;
}

.scroll {
    overflow-y: auto;
}
</style>