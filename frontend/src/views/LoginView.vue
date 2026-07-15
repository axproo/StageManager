<script setup>
import { useAppStore } from '../stores/user.store'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useAppStore()
function handleLogin() {
  store.login('John')      // Update the store
  router.push('/dashboard') // Redirect to dashboard
}
</script>

<template>
  <div>
    <h1>Login Page</h1>
    <button @click="handleLogin">Login</button>
  </div>
</template>

<style scoped>
button {
  padding: 8px 16px;
  color:white;
  background-color:blue;
  cursor:pointer
}
</style>