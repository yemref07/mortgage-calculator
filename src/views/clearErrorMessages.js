import { watch } from 'vue';
import { info, interestRate, errorMessages } from './HomeView.vue';

export const clearErrorMessages = watch(info, () => {
if (interestRate.value !== 0) {
errorMessages.value.interestRate = "";
}
});
