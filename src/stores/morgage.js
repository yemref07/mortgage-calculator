import { ref} from 'vue'
import { defineStore } from 'pinia'

export const useMorgageStore = defineStore('morgage', () => {
  const mountlyLoan = ref(0)
  const totalLoan = ref(0)

  const mountlyLoanAmount = function ({ interestRate, loanAmount, downPayment, rePaymentTime }) {
    let t = parseInt(rePaymentTime) * 12;
    let r = parseInt(interestRate) / 12;
    let p = parseInt(loanAmount) - parseInt(downPayment);

    let result = p * ( (r * Math.pow(1+r,t) ) / ( Math.pow(1+r,t) - 1) );
    let roundedResult = result.toFixed(2);
    let finalResult = parseFloat(roundedResult);  

    mountlyLoan.value = finalResult;
  };

  const totalLoanAmount = function ({ interestRate, downPayment, rePaymentTime, loanAmount }) {
    let t = parseInt(rePaymentTime) * 12;
    let r = parseInt(interestRate);
    let p = parseInt(loanAmount) - parseInt(downPayment);

    let result = p * ( (r * Math.pow(1+r,t) ) / ( Math.pow(1+r,t) - 1) );
    let roundedResult = result.toFixed(2);
    let finalResult = parseFloat(roundedResult);  
    totalLoan.value = finalResult;
  };



  const reset = function () {
    mountlyLoan.value = 0
    totalLoan.value = 0
  }

  return {
    mountlyLoanAmount,
    totalLoanAmount,
    mountlyLoan,
    totalLoan,
    reset
  }
})
