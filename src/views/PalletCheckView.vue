<template>

    <v-card class="mx-auto" max-width="1000">
        <v-card-title>Paleta do sprawdzenia nr {{ $route.params.singlePallet }}</v-card-title>
        <v-container class="mb-3 pa-md-5 mx-lg-auto">

            <v-row no-gutters class="mb-5 mx-auto text-decoration-underline">
                <v-col>
                    <h4>Parametr</h4>
                </v-col>
                <v-col>
                    <h4>Spełniony</h4>
                </v-col>
                <v-col>
                    <h4>Dodatkowy komentarz</h4>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    Wysokość palety poniżej 1,8m
                </v-col>
                <v-col>
                    <v-radio-group row mandatory>
                        <v-radio row label="Tak" value="radio-1" color="success"></v-radio>
                        <v-radio row label="Nie" value="radio-2" color="error"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col>
                    <v-text-field></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    Zachowanie zasady ciężkiie/lekkie
                </v-col>
                <v-col>
                    <v-radio-group row>
                        <v-radio label="Tak" value="radio-1" color="success"></v-radio>
                        <v-radio label="Nie" value="radio-2" color="error"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col>
                    <v-text-field></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    Stabilne ułozenie towaru na palecie
                </v-col>
                <v-col>
                    <v-radio-group row>
                        <v-radio label="Tak" value="radio-1" color="success"></v-radio>
                        <v-radio label="Nie" value="radio-2" color="error"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col>
                    <v-text-field></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    Towar wystaje poza obrys
                </v-col>
                <v-col>
                    <v-radio-group row>
                        <v-radio label="Tak" value="radio-1" color="success"></v-radio>
                        <v-radio label="Nie" value="radio-2" color="error"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col>
                    <v-text-field></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    Obecność etykiety adresowej
                </v-col>
                <v-col>
                    <v-radio-group row>
                        <v-radio label="Tak" value="radio-1" color="success"></v-radio>
                        <v-radio label="Nie" value="radio-2" color="error"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col>
                    <v-text-field></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    Poprawne zabezpieczenie folią
                </v-col>
                <v-col>
                    <v-radio-group row>
                        <v-radio label="Tak" value="radio-1" color="success"></v-radio>
                        <v-radio label="Nie" value="radio-2" color="error"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col>
                    <v-text-field></v-text-field>
                </v-col>
            </v-row>

            <v-card-actions class="text-center">
                <v-btn @click="returnToMenu">Anuluj</v-btn>
                <v-btn>Zatwierdź</v-btn>
            </v-card-actions>
        </v-container>
    </v-card>

</template>
<script>

export default {
    name: 'PalletCheckView',
    data() {
        return {
        }
    },
    methods: {
        returnToMenu() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
</style>