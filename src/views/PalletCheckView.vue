<template>

    <v-card class="mx-auto" max-width="1000">
        <v-card-title :palletId="palletId">Paleta do sprawdzenia ID {{ palletId }}</v-card-title>
        <v-container class="mb-3 pa-md-5 mx-lg-auto">

            <v-form ref="form" v-model="valid" lazy-validation>

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
                        <v-radio-group row mandatory required v-model="palletData.label1.trueOrFalse">
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="palletData.label1.comment"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Zachowanie zasady ciężkiie/lekkie
                    </v-col>
                    <v-col>
                        <v-radio-group row required v-model="palletData.label2">
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
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
                        <v-radio-group row required v-model="palletData.label3">
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
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
                        <v-radio-group row required v-model="palletData.label4">
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
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
                        <v-radio-group row required v-model="palletData.label5">
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
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
                        <v-radio-group row required v-model="palletData.label6">
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field></v-text-field>
                    </v-col>
                </v-row>

                <v-card-actions class="text-center">
                    <v-btn @click="returnToMenu">Anuluj</v-btn>
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                        Zatwierdź
                    </v-btn>
                </v-card-actions>

            </v-form>
        </v-container>
    </v-card>

</template>
<script>

export default {
    name: 'PalletCheckView',
    props: {
        palletId: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            valid: true,
            radioButton: Boolean,
            palletData: {
                label1: { label: 'Wysokość palety poniżej 1,8m', trueOrFalse: Boolean, comment: null },
                label2: { label: 'Zachowanie zasady ciężkiie/lekkie', trueOrFalse: Boolean, comment: null },
                label3: { label: 'Stabilne ułozenie towaru na palecie', trueOrFalse: Boolean, comment: null },
                label4: { label: 'Towar wystaje poza obrys', trueOrFalse: Boolean, comment: null },
                label5: { label: 'Obecność etykiety adresowej', trueOrFalse: Boolean, comment: null },
                label6: { label: 'Poprawne zabezpieczenie folią', trueOrFalse: Boolean, comment: null },
            },
        }
    },
    methods: {
        returnToMenu() {
            this.$router.push('/')
        },
        validate() {
            // this.$refs.form.validate();
            console.log(this.palletData)
        },
    }
}
</script>

<style scoped>
.v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
}
</style>