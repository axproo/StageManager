<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth.store";

const router = useRouter();

const authStore = useAuthStore();

onMounted(() => {
  authStore.logout();

  router.push("/login");
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    Déconnexion...
  </div>
</template>
