<template>
    <v-card class="mx-auto" max-width="1000" tile>
        <v-card-title>Palety w kolejce</v-card-title>

        <v-list>
            <v-list-item-group v-model="selectedItem" color="primary" dense>
                <v-list-item v-for="pallet in pallets" :key="pallet.id">
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ pallet.number }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-card-actions>
            <v-btn text>
                <v-icon left>
                    mdi-arrow-right-bold
                </v-icon>Przejdź do kontroli palety
            </v-btn>
            <v-btn text @click="generateNewPallets">
                <v-icon left>
                    mdi-playlist-plus
                </v-icon>Wygeneruj nowe palety
            </v-btn>
        </v-card-actions>



        <v-snackbar color="red" :value="errorMessage != null" :multi-line="multiLine">
            {{ errorMessage }}

            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="errorMessage = null">
                    Zamnkij
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
        }
    },
    methods: {
        async fetchDailyPallets() {
            const response = await fetch('api/dailyPallets');
            const json = await response.json();
            this.pallets = json;
        },
        goToPalletCheck() {
        },
        async generateNewPallets() {
            const response = await fetch('api/dailyPallets', {
                method: 'POST'
            });
            const json = await response.json();
            if (response.status == 400) {
                this.errorMessage = json.errorMessage;
                // alert(json.errorMessage)
            }
        },

    },
    mounted() {
        this.fetchDailyPallets();
    }
}
</script>