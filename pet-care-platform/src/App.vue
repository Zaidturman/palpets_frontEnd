<template>
  <div id="app">
    <AppHeader v-if="!$route.meta.hideHeader" />
    <main :class="{ 'auth-page': $route.meta.hideHeader }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter v-if="!$route.meta.hideFooter" />
    <ToastContainer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(() => {
  authStore.init()
  cartStore.init()
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  background-color: var(--light-color);
}

.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>