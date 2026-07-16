<script setup>
import { useAppStore } from "@stores/user.store";

const store = useAppStore();
</script>
<template>
  <div class="dashboard">
    <h1 class="text-3xl font-bold underline">Dashboard</h1>
    <p>Welcome {{ store.username }}</p>
  </div>
</template>
