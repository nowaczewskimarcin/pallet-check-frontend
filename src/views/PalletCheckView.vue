<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="mx-auto" max-width="1000">
            <v-card-title :palletId="palletId">Paleta do sprawdzenia ID {{ palletId }}</v-card-title>
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
                        <v-radio-group class="ma-0 pa-0" row mandatory required
                            v-model="palletStatusUpdateModel.isCorrectHeight">
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
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
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
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
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
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
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
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
                            <v-radio row label="Tak" value="true" color="success"></v-radio>
                            <v-radio row label="Nie" value="false" color="error"></v-radio>
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


            </v-container>
        </v-card>
    </v-form>
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
            valid: false,
            palletStatusUpdateModel: {
                isCorrectHeight: Boolean,
                heightComment: '',
                isHeavyLightRule: Boolean,
                heavyLightRuleComment: '',
                isStable: Boolean,
                stabilityComment: '',
                hasAddressLabel: Boolean,
                addressLabelComment: '',
                isWrappedWithStretch: Boolean,
                stretchWrapComment: '',
            },
            // palletData: {
            //     label1: { label: 'Wysokość palety poniżej 1,8m', trueOrFalse: Boolean, comment: null },
            //     label2: { label: 'Zachowanie zasady ciężkiie/lekkie', trueOrFalse: Boolean, comment: null },
            //     label3: { label: 'Stabilne ułozenie towaru na palecie', trueOrFalse: Boolean, comment: null },
            //     label4: { label: 'Towar wystaje poza obrys', trueOrFalse: Boolean, comment: null },
            //     label5: { label: 'Obecność etykiety adresowej', trueOrFalse: Boolean, comment: null },
            //     label6: { label: 'Poprawne zabezpieczenie folią', trueOrFalse: Boolean, comment: null },
            // },   
        }
    },
    methods: {
        returnToMenu() {
            this.$router.push('/')
        },
        validate() {
            // const form = document.querySelector("form");
            // const dataToSend = new FormData(form);
            // form.sendForm = (e) => {
            //     console.log(dataToSend)
            //     fetch('form.php', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ isCorrectHeight: palletStatusUpdateModel.isCorrectHeight })

            //     }).then((res) => {
            //         console.log(res)
            //     }).catch((err) =>
            //         console.log(err));
            // }
            this.$refs.form.validate();
            console.log('kliknięto wysyłanie')
            // console.log(this.palletStatusUpdateModel)
        },
        async approvePallet() {
            axios({
                method: 'post',
                url: '/api/PalletsStatuses/' + this.palletId,
                data: {
                    data: this.palletStatusUpdateModel,
                }
            });
        },
    }
}
</script>

<style scoped>
</style>
