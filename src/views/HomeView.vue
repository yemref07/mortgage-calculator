<template>
  <div
    class="container mx-auto box-border relative p-5 sm:p-10 md:p-20 rounded-xl md:w-3/5 bg-slate-900 mt-10"
  >
    <div class="flex flex-row">
      <div class="basis-full text-lime-50 text-3xl">
        <h1 class="text-start">Mortgage Calculator</h1>
      </div>
    </div>

    <div class="flex flex-row text-start mt-20">
      <div class="basis-1/2 text-lime-50 text-lg">
        <h3>Loan Amount: {{ info.loanAmount }} {{ info.loanAmount > 0 ? '$' : '' }}</h3>
      </div>

      <div class="basis-1/2 text-lime-50 text-lg">
        <h3>Down Payment: {{ info.downPayment }} {{ info.downPayment > 0 ? '$' : '' }}</h3>
      </div>
    </div>

    <div class="flex flex-row text-start mt-5">
      <div class="basis-1/2 text-lime-50 text-lg pr-10">
        <input
          type="range"
          step="1000"
          v-model.number="info.loanAmount"
          class="bg-red-600 h-3.5 rounded-full"
          min="0"
          max="100000"
        />
        <span v-if="errorMessages.loanAmountErr">{{ errorMessages.loanAmountErr }}</span>
      </div>

      <div class="basis-1/2 text-lime-50 text-lg pr-10">
        <input
          type="range"
          step="1000"
          v-model.number="info.downPayment"
          class="bg-red-600 h-3.5 rounded-full"
          min="0"
          max="100000"
        />
        <span v-if="errorMessages.downPaymentErr">{{ errorMessages.downPaymentErr }}</span>
      </div>
    </div>

    <div class="flex flex-row text-start mt-20">
      <div class="basis-1/2 text-lime-50 text-lg">
        <h3>Interest Rate: {{ info.interestRate }} {{ info.interestRate > 0 ? '%' : '' }}</h3>
      </div>
      <div class="basis-1/2 text-lime-50 text-lg">
        <h3>
          Repayment Time: {{ info.rePaymentTime }} {{ info.rePaymentTime > 0 ? 'years' : '' }}
        </h3>
      </div>
    </div>

    <div class="flex flex-row text-start mt-5">
      <div class="basis-1/2 text-lime-50 text-lg pr-10">
        <input
          type="range"
          v-model.number="info.interestRate"
          class="bg-red-600 h-3.5 rounded-full"
          min="0"
          max="100"
        />
        <span v-if="errorMessages.interestRateErr">{{ errorMessages.interestRateErr }}</span>
      </div>

      <div class="basis-1/2 text-lime-50 text-lg pr-10">
        <input
          type="range"
          v-model.number="info.rePaymentTime"
          class="bg-red-600 h-3.5 rounded-full"
          min="0"
          max="20"
        />
        <span v-if="errorMessages.rePaymentTimeErr">{{ errorMessages.rePaymentTimeErr }}</span>
      </div>
    </div>

    <div class="flex flex-row text-center mt-20">
      <div class="basis-1/2">
        <button
          @click="getResult"
          class="h-10 px-5 m-2 font-medium w-3/4 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
        >
          CALCULATE
        </button>
      </div>
      <div class="basis-1/2">
        <button
          @click="resetAll"
          class="h-10 px-5 m-2 font-medium w-3/4 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
        >
          RESET
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMorgageStore } from '../stores/morgage'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const store = useMorgageStore()
const { mountlyLoanAmount, totalLoanAmount, reset } = store

let validty = ref(false)
let errorMessages = ref({
  loanAmountErr: '',
  interestRateErr: '',
  downPaymentErr: '',
  rePaymentTimeErr: ''
})

let info = ref({
  interestRate: 0,
  loanAmount: 0,
  downPayment: 0,
  rePaymentTime: 0
})

const clearAllErrorMessages = function () {
  for (const key in errorMessages) {
    errorMessages[key] = ''
  }
}

const resetAll = function () {
  info.value.interestRate = 0
  info.value.loanAmount = 0
  info.value.downPayment = 0
  info.value.rePaymentTime = 0
  reset()
  clearAllErrorMessages()
}

const showError = () => {
  let { interestRate, loanAmount, rePaymentTime, downPayment } = info.value
  let { loanAmountErr, interestRateErr, rePaymentTimeErr, downPaymentErr } = errorMessages.value

  if (interestRate === 0) {
    interestRateErr = 'Interest Rate is required'
  } else {
    interestRateErr = ''
  }

  if (loanAmount === 0) {
    loanAmountErr = 'Loan Amount is reuired'
  } 
  else if (loanAmount < downPayment) {
   loanAmountErr = 'Loan Amount cannot be lesser that loan amount'
  } 
  else {
    loanAmountErr = ''
  }

  if (downPayment === 0) {
    downPaymentErr = 'Down Payment is required'
  } 

  else if (loanAmount < downPayment) {
    downPaymentErr = 'Down Payment cannot be greater that loan amount'
  }  

  else {
    downPaymentErr = ''
  }

  if (rePaymentTime === 0) {
    rePaymentTimeErr = 'Repayment Time is required'
  } else {
    rePaymentTimeErr = ''
  }

  return {
    loanAmountErr,
    rePaymentTimeErr,
    downPaymentErr,
    interestRateErr
  }
}

const checkValidity = () => {
  const { rePaymentTime, loanAmount, downPayment, interestRate } = info.value
  if (
    rePaymentTime !== 0 &&
    loanAmount !== 0 &&
    downPayment !== 0 &&
    interestRate !== 0 &&
    downPayment < loanAmount
  ) {
    validty.value = true
  } else {
    validty.value = false
  }
};

const observeInfo = watch(
  info,
  () => {
    console.log('Watcher callback triggered');
    errorMessages.value = showError() ;
    checkValidity();
  },
  { deep: true }
)

function getResult() {
  if (validty.value) {
    mountlyLoanAmount(info.value)
    totalLoanAmount(info.value)
    router.push({ name: 'result' })
  }
};
</script>

<style>
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
}

/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type='range']::-webkit-slider-runnable-track {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity));
  height: 0.875rem;
  border-radius: 9999px;
}

/******** Firefox ********/
input[type='range']::-moz-range-track {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity));
  height: 0.875rem;
  border-radius: 9999px;
}

/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  margin-top: -4px; /* Centers thumb on the track */
  background-color: rgb(255, 255, 255);
  height: 1.3rem;
  width: 1.3rem;
  border-radius: 100%;
}

input[type='range']::-moz-range-thumb {
  border: none; /*Removes extra border that FF applies*/
  border-radius: 100%;
  background-color: rgb(255, 255, 255);
  height: 1.3rem;
  width: 1.3rem;
}

/***** Focus Styles *****/
/* Removes default focus */
input[type='range']:focus {
  outline: none;
}

/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type='range']:focus::-webkit-slider-thumb {
  border: 1px solid rgb(220 38 38);
  outline: 3px solid rgb(220 38 38);
  outline-offset: 0.125rem;
}

/******** Firefox ********/
input[type='range']:focus::-moz-range-thumb {
  border: 1px solid rgb(220 38 38);
  outline: 3px solid rgb(220 38 38);
  outline-offset: 0.125rem;
}
</style>
