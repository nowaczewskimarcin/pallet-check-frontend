<template>
    <v-card class="mx-auto" max-width="1000" :loading="loading">
        <v-card-title v-model="palettNumber">Paleta do sprawdzenia o numerze: {{
                palettNumber
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
                        <v-text-field :error-messages="errorMessage.height" class="ma-0 pa-0"
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
                        <v-text-field :error-messages="errorMessage.heavyLightRule" class="ma-0 pa-0"
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
                        <v-text-field :error-messages="errorMessage.stability" class="ma-0 pa-0"
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
                        <v-text-field :error-messages="errorMessage.addressLabel" class="ma-0 pa-0"
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
                        <v-text-field :error-messages="errorMessage.stretchWrap" class="ma-0 pa-0"
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
            palettNumber: null,
            errorMessage: {
                height: null,
                heavyLightRule: null,
                stability: null,
                addressLabel: null,
                stretchWrap: null,
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
            this.$router.push({ name: 'palletsSelect' })
        },
        async approvePallet() {
            this.loading = true;
            try {
                await axios.post('/api/PalletsStatuses/' + this.palletId, this.palletStatusUpdateModel)
                this.$router.push({ name: 'palletProductsView', params: { palletId: this.palletId } })
            }
            catch (err) {
                if (err.response.status == 406) {
                    const validationErrors = err.response.data.validationErrors;
                    this.setErrors(validationErrors);
                }
            }
            finally {
                this.loading = false;
            }
        },
        setErrors(validationErrors) {
            this.errorMessage.height = validationErrors.heightComment;
            this.errorMessage.heavyLightRule = validationErrors.heavyLightRuleComment;
            this.errorMessage.stability = validationErrors.stabilityComment;
            this.errorMessage.addressLabel = validationErrors.addressLabelComment;
            this.errorMessage.stretchWrap = validationErrors.stretchWrapComment;
        },
        async fetchPalletStatus() {
            this.loading = true;
            try {
                await this.fetchPalletFromServer();
            } finally {
                this.loading = false;
            }
        },
        async fetchPalletFromServer() {
            const response = await axios.get('/api/PalletsStatuses/' + this.palletId);
            const palletStatus = response.data;
            this.setFetchValue(palletStatus);
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
            this.palettNumber = palletStatus.number;
        }
    },
    async mounted() {
        await this.fetchPalletStatus();
    }
}
</script>
<style scoped>
</style>