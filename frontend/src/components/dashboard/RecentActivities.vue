<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { dashboardService } from '@/services/dashboard.service'
import type { DashboardActivity } from '@/types/dashboard'

const activites = ref<DashboardActivity[]>([])

onMounted(() => {
  activites.value = dashboardService.getActivities()
})
</script>
