<template>
    <div>
        <ul v-for="(menu, idx) in menus">
            <li>
                <router-link :to="menu.path" :key="idx">{{ menu.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';


const routes = useRoute()
const router = useRouter()

console.log(router.getRoutes())
const menus = router.getRoutes().filter(r => r.meta.public === false)
</script>