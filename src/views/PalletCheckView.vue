<template>
    <v-card class="mx-auto" max-width="1000" :loading="loading">
        <v-card-title v-model="palletNumber">Paleta do sprawdzenia o numerze: {{
                palletNumber
        }}</v-card-title>
        <v-container class="mb-3 pa-md-5 mx-lg-auto">
            <v-form ref="form" lazy-validation>

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
                        <v-radio-group class="ma-0 pa-0" row v-model="palletStatusUpdateModel.isCorrectHeight">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field :error-messages="errorMessage.heightComment" class="ma-0 pa-0"
                            v-model="palletStatusUpdateModel.heightComment">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Zachowanie zasady ciężkie/lekkie
                    </v-col>
                    <v-col>
                        <v-radio-group row v-model="palletStatusUpdateModel.isHeavyLightRule" class="ma-0 pa-0">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field :error-messages="errorMessage.heavyLightRuleComment" class="ma-0 pa-0"
                            v-model="palletStatusUpdateModel.heavyLightRuleComment">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Stabilne ułozenie towaru na palecie
                    </v-col>
                    <v-col>
                        <v-radio-group class="ma-0 pa-0" row v-model="palletStatusUpdateModel.isStable">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field :error-messages="errorMessage.heavyLightRuleComment" class="ma-0 pa-0"
                            v-model="palletStatusUpdateModel.stabilityComment">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Obecność etykiety adresowej
                    </v-col>
                    <v-col>
                        <v-radio-group class="ma-0 pa-0" row v-model="palletStatusUpdateModel.hasAddressLabel">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field :error-messages="errorMessage.heavyLightRuleComment" class="ma-0 pa-0"
                            v-model="palletStatusUpdateModel.addressLabelComment">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Poprawne zabezpieczenie folią
                    </v-col>
                    <v-col>
                        <v-radio-group class="ma-0 pa-0" row v-model="palletStatusUpdateModel.isWrappedWithStretch">
                            <v-radio row label="Tak" :value="true" color="success"></v-radio>
                            <v-radio row label="Nie" :value="false" color="error"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col>
                        <v-text-field :error-messages="errorMessage.heavyLightRuleComment" class="ma-0 pa-0"
                            v-model="palletStatusUpdateModel.stretchWrapComment">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-card-actions class="text-center">
                    <v-btn @click="returnToMenu">Anuluj</v-btn>
                    <v-btn color="success" class="mr-4" @click="approvePallet">
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
            loading: false,
            palletNumber: null,
            errorMessage: {
                heightComment: null,
                heavyLightRuleComment: null,
                stabilityComment: null,
                addressLabelComment: null,
                stretchWrapComment: null,
            },
            palletStatusUpdateModel: {
                isCorrectHeight: null,
                heightComment: null,
                isHeavyLightRule: null,
                heavyLightRuleComment: null,
                isStable: null,
                stabilityComment: null,
                hasAddressLabel: null,
                addressLabelComment: null,
                isWrappedWithStretch: null,
                stretchWrapComment: null,
            },
        }
    },
    methods: {
        returnToMenu() {
            this.$router.push('/');
        },
        async approvePallet() {
            this.loading = true;
            try {
                await axios.post('/api/PalletsStatuses/' + this.palletId, this.palletStatusUpdateModel)
                // .catch(function (error) {
                // if (error.response) {
                //     console.log('Status odpowiedzi z serwera: ' + error.response.status + ' - błąd: ' + error.response.data.validationErrors.addressLabelComment);
                //     console.log(error.response.data.validationErrors.addressLabelComment)
                //     this.errorMessage.push(error.response.data.validationErrors.addressLabelComment);
                // }
                //     console.log(error)
                //     console.log(error.response.data.errorMessage)
                //     console.log(error.response.data.validationErrors)
                //     if (error.response.data.validationErrors.addressLabelComment) {

                //     }
                //     console.log(error.response.data.validationErrors.addressLabelComment, error.response.data.validationErrors.stabilityComment,
                //         error.response.data.validationErrors.heavyLightRuleComment, error.response.data.validationErrors.heightComment,
                //         error.response.data.validationErrors.stretchWrapComment)
                // });

            }
            catch (err) {
                const validationErrors = err.response.data.validationErrors;
                this.errorMessage.heightComment = validationErrors.heightComment;
                this.errorMessage.heavyLightRuleComment = validationErrors.heavyLightRuleComment;
                this.errorMessage.stabilityComment = validationErrors.stabilityComment;
                this.errorMessage.addressLabelComment = validationErrors.addressLabelComment;
                this.errorMessage.stretchWrapComment = validationErrors.stretchWrapComment;
            }
            finally {
                this.loading = false;
            }
        },
        async fetchPalletStatus() {
            this.loading = true;
            try {
                await this.fetchPalletFromServer();
            } finally {
                this.loading = false;
            }
        },
        // checkForm(palletStatus) {

        //     const dupa = palletStatus.validationErrors;
        //     console.log(dupa)

        // if (validationErrors = true) {
        //     console.log('Wystąpił błąd')
        // }
        // if (this.palletStatus.status == 404) {
        //     console.log('Aktualna paleta nie była zapisana')
        // };
        // if (this.palletStatus.status == 406) {
        //     console.log('Odpowiedź z serwera: błąd 406: Not acceptable')
        // };
        // if (response.status == 400) {
        //     const json = await response.json();
        //     this.errorMessage = json.errorMessage;
        // }
        // },
        async fetchPalletFromServer() {
            const response = await axios.get('/api/PalletsStatuses/' + this.palletId);
            const palletStatus = response.data;
            this.setFetchValue(palletStatus);
            // console.log(palletStatus.number) zostawiam tą linijke póki co bo mi sie przyda do wglądu ten consollog
        },
        setFetchValue(palletStatus) {
            this.palletStatusUpdateModel.isCorrectHeight = palletStatus.isCorrectHeight;
            this.palletStatusUpdateModel.heightComment = palletStatus.heightComment;
            this.palletStatusUpdateModel.isHeavyLightRule = palletStatus.isHeavyLightRule;
            this.palletStatusUpdateModel.heavyLightRuleComment = palletStatus.heavyLightRuleComment;
            this.palletStatusUpdateModel.isStable = palletStatus.isStable;
            this.palletStatusUpdateModel.stabilityComment = palletStatus.stabilityComment;
            this.palletStatusUpdateModel.hasAddressLabel = palletStatus.hasAddressLabel;
            this.palletStatusUpdateModel.addressLabelComment = palletStatus.addressLabelComment;
            this.palletStatusUpdateModel.isWrappedWithStretch = palletStatus.isWrappedWithStretch;
            this.palletStatusUpdateModel.stretchWrapComment = palletStatus.stretchWrapComment;
            this.palletNumber = palletStatus.number;
        }
    },
    async mounted() {
        await this.fetchPalletStatus();
    }
}
</script>

<style scoped>
</style>