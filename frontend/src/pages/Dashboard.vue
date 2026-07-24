<script setup>
import { useAppStore } from "@stores/user.store";
import NavBarView from "@components/base/navbar/NavBarView.vue";

const store = useAppStore();
</script>
<template>
  <NavBarView />
</template>
