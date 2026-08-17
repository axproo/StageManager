<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <div class="flex">
      <SideBar v-if="!isDashBoardPage()" />

      <main class="flex-1">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "./header/Header.vue";
import SideBar from "./sidebar/SideBar.vue";
import Footer from "./footer/Footer.vue";
import { useRoute } from "vue-router";

const dashboardPage = ["/dashboard"];
const route = useRoute();

const isDashBoardPage = () => {
  return dashboardPage.includes(route.path);
};
</script>

<style scoped></style>
