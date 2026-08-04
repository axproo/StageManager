<template>
  <div class="bg-gray-100">
    <p>Welcome baczzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzk</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const routes = useRoute();
const router = useRouter();

console.log(router.getRoutes());
const menus = router.getRoutes().filter((r) => r.meta.public === false);
</script>
