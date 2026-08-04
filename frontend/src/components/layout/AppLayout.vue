<template>
  <div class="min-h-screen flex flex-col h-[2000px]">
    <Header />

    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "./header/Header.vue";
import SideBar from "./sidebar/SideBar.vue";
import Footer from "./footer/Footer.vue";
</script>

<style scoped></style>
