<template>
  <div class="container mx-auto p-4">
    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-1 text-center">
      <div class="bg-blue-600 p-4 text-lime-50 h-64 flex flex-col items-center justify-center">
        <h1 class="text-xl font-semibold">Mounty Payment: {{ mountlyLoan }}$</h1>
      </div>
      <div class="bg-red-600 p-4 text-lime-50 h-64 flex flex-col items-center justify-center">
        <h1 class="text-xl font-semibold">Totol Loan: {{ totalLoan }}$</h1>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMorgageStore } from '../stores/morgage.js'
import { storeToRefs } from 'pinia'

const store = useMorgageStore()

const { mountlyLoan, totalLoan } = storeToRefs(store);
</script>
<style></style>
