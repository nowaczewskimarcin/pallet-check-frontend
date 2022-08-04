<template>
    <v-card class="mx-auto" max-width="1000" tile :loading="loading">
        <template slot="progress">
            <v-progress-linear color="deep-purple" height="20" indeterminate></v-progress-linear>
        </template>
        <v-card-title>Palety w kolejce</v-card-title>

        <v-list class="scroll" max-height="50vh">
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

        <v-card-actions>
            <v-btn text depressed :disabled="selectedPallet == null" @click="goToPalletCheck">
                <v-icon left>
                    mdi-arrow-right-bold
                </v-icon>Przejdź do kontroli palety
            </v-btn>
            <v-btn text @click="generateNewPallets" :disabled="generateNewPalletsButtonDisabled">
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
    data() {
        return {
            pallets: null,
            errorMessage: null,
            selectedPallet: null,
            generateNewPalletsButtonDisabled: false,
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
            console.log(this.pallets)
            alert('Wybrana paleta: ' + this.pallets[this.selectedPallet].number);
        },
        async generateNewPallets() {
            this.reserve();
            this.disabled = true;
            try {
                const response = await fetch('api/dailyPallets', {
                    method: 'POST'
                });
                if (response.status == 400) {
                    const json = await response.json();
                    this.errorMessage = json.errorMessage;
                    // alert(json.errorMessage)
                }
                await this.fetchDailyPallets();
            } finally {
                this.disabled = false
            }
        },
        onSnackbarInput(onSnackbarValue) {
            if (onSnackbarValue == false) {
                this.errorMessage = null;
            }
        },
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
    mounted() {
        this.fetchDailyPallets();
    },
}
</script>

<style scoped>
.v-list-item {
    margin: 0 0 0 3vh;
    padding: 0;
}

.scroll {
    overflow-y: scroll
}
</style>