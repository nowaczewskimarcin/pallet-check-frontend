<template>
    <v-card class="mx-auto" max-width="1000" max-height="500px" tile>
        <v-card-title>Palety w kolejce</v-card-title>

        <v-list class="scroll">
            <v-list-item-group v-model="selectedItem" color="primary">

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
            <v-btn text depressed :disabled="selectedItem == null" @click="goToPalletCheck">
                <v-icon left>
                    mdi-arrow-right-bold
                </v-icon>Przejdź do kontroli palety
            </v-btn>
            <v-btn text @click="generateNewPallets" :disabled="disabled">
                <v-icon left>
                    mdi-playlist-plus
                </v-icon>Wygeneruj nowe palety
            </v-btn>
        </v-card-actions>

        <<<<<<< HEAD <v-snackbar color="red" :value="errorMessage != null">
            =======
            <v-snackbar color="red" :value="errorMessage != null" @input="onSnackbarInput" :multi-line="multiLine">
                >>>>>>> 75da531af51acb6cbaf8ac690a6e8c879ed0ed2d
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
            selectedItem: null,
            disabled: false,
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
            alert('Wybrana paleta: ' + this.pallets[this.selectedItem].number);
        },
        async generateNewPallets() {
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
            },
            onSnackbarInput(onSnackbarValue) {
                if (onSnackbarValue == false) {
                    this.errorMessage = null;
                }
            },
        },
        mounted() {
            this.fetchDailyPallets();
        },
    }
}
</script>

<style scoped>
html {
    overflow: hidden !important;
}

.v-card {
    display: flex !important;
    flex-direction: column;
}

.v-list-item {
    margin: 0;
    padding: 0;

}

.scroll {
    overflow-y: scroll
}
</style>