<script setup lang="ts">
import { users } from '@/mock/users'
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-3xl font-bold">Utilisateurs</h1>

    <div v-for="user in users" :key="user.id" class="mb-3 rounded-lg bg-gray-100 p-4">
      <h2 class="font-bold">
        {{ user.name }}
      </h2>

      <p>Email : {{ user.email }}</p>

      <p>Role : {{ user.role }}</p>
    </div>
  </div>
</template>
