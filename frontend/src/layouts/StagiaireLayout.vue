<script setup lang="ts">

import StagiaireSidebar from "../components/navigation/StagiaireSidebar.vue";

</script>


<template>

<div class="flex min-h-screen">


    <StagiaireSidebar />


    <main class="flex-1">

        <RouterView />

    </main>


</div>

</template>