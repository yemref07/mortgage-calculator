<script setup>
import {  RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component,route }">
  <transition name="slide" mode="out-in">
    <component :is="Component" :key="route.path" />
  </transition>
</router-view>


</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 1s,
    transform 1s;
}

.slider-enter-from,
.slide-leave-to {
  opacity: 0;
}


</style>
