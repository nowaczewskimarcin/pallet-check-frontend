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
                        <v-radio-group class="ma-0 pa-0" row mandatory required
                            v-model="palletStatusUpdateModel.isCorrectHeight">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field class="ma-0 pa-0" v-model="palletStatusUpdateModel.heightComment">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Zachowanie zasady ciężkiie/lekkie
                    </v-col>
                    <v-col>
                        <v-radio-group row required v-model="palletStatusUpdateModel.isHeavyLightRule"
                            class="ma-0 pa-0">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field class="ma-0 pa-0" v-model="palletStatusUpdateModel.heavyLightRuleComment">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Stabilne ułozenie towaru na palecie
                    </v-col>
                    <v-col>
                        <v-radio-group class="ma-0 pa-0" row required v-model="palletStatusUpdateModel.isStable">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field class="ma-0 pa-0" v-model="palletStatusUpdateModel.stabilityComment">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Obecność etykiety adresowej
                    </v-col>
                    <v-col>
                        <v-radio-group class="ma-0 pa-0" row required v-model="palletStatusUpdateModel.hasAddressLabel">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field class="ma-0 pa-0" v-model="palletStatusUpdateModel.addressLabelComment">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Poprawne zabezpieczenie folią
                    </v-col>
                    <v-col>
                        <v-radio-group class="ma-0 pa-0" row required
                            v-model="palletStatusUpdateModel.isWrappedWithStretch">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field class="ma-0 pa-0" v-model="palletStatusUpdateModel.stretchWrapComment">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-card-actions class="text-center">
                    <v-btn @click="returnToMenu">Anuluj</v-btn>
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="approvePallet">
                        Zatwierdź
                    </v-btn>
                </v-card-actions>

            </v-form>
        </v-container>
    </v-card>

</template>
<script>
import axios from 'axios';
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
            valid: false,
            true: true,
            false: false,
            palletStatusUpdateModel: {
                isCorrectHeight: true,
                heightComment: null,
                isHeavyLightRule: true,
                heavyLightRuleComment: null,
                isStable: true,
                stabilityComment: null,
                hasAddressLabel: true,
                addressLabelComment: null,
                isWrappedWithStretch: true,
                stretchWrapComment: null,
            },
        }
    },
    methods: {
        returnToMenu() {
            this.$router.push('/')
        },
        validate() {
            this.$refs.form.validate();
            console.log('kliknięto wysyłanie')
            // console.log(this.palletStatusUpdateModel)
        },
        async approvePallet() {
            axios({
                method: 'POST',
                url: '/api/PalletsStatuses/' + this.palletId,
                data: this.palletStatusUpdateModel,
                headers: { "Content-Type": "application/json" },
            });
            console.log(this.palletStatusUpdateModel)
            // if (error.response) {

            //     console.log('Błąd: error response')
            // } else if (error.request) {

            //     console.log('Błąd: error request')

            // } else if (error.message) {

            //     console.log('Błąd: wyświetla wiadomość')

            // }
        },
    }
}
</script>

<style scoped>
</style>
