```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { AppCard } from '@/components/ui'
import { dashboardService } from '@/services/dashboard.service'
import type { DashboardStat } from '@/types/dashboard'

const stats = ref<DashboardStat[]>([])

onMounted(() => {
  stats.value = dashboardService.getStats()
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <AppCard v-for="stat in stats" :key="stat.title">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500">
            {{ stat.title }}
          </p>

          <h2 class="text-3xl font-bold text-gray-800 mt-2">
            {{ stat.value }}
          </h2>
        </div>

        <div
          :class="[
            'w-14 h-14 rounded-xl bg-gradient-to-r flex items-center justify-center text-3xl',
            stat.color,
          ]"
        >
          {{ stat.icon }}
        </div>
      </div>
    </AppCard>
  </div>
</template>
```
