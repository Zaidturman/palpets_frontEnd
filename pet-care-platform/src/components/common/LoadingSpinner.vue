<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'جاري التحميل...'
  }
})
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid var(--gray-light);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  p {
    margin-top: 1rem;
    color: var(--gray-color);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>