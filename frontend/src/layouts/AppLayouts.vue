<template>
    <div class="min-h-screen xl:flex">
        <!-- <HeaderLayout /> -->
        
        <SidebarLayout />
        
        <main>
            <router-view />
        </main>
        
        <!-- <FooterLayout /> -->
    </div>
</template>

<script setup lang="ts">
import HeaderLayout from './HeaderLayout.vue';
import SidebarLayout from './SidebarLayout.vue';
import FooterLayout from './FooterLayout.vue';


</script>

<style scoped>

</style>