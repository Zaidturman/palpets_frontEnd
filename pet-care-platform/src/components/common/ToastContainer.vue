<template>
  <Toast />
</template>

<script setup>
import { useToast } from 'vue-toastification'
import Toast from 'vue-toastification/dist/ToastComponent.vue'

const toast = useToast()
</script>