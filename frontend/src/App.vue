<script setup lang="ts">
import { ref, computed } from 'vue'

/** Sample reactive data */
const user = {
  name: 'Axproo Team',
  avatar: 'https://ui-avatars.com/api/?name=Axproo&background=0D9488&color=fff'
}

/** KPI cards */
const kpis = ref([
  { id: 1, title: 'Active Users', value: 1284, delta: '+8.2%' },
  { id: 2, title: 'New Signups', value: 312, delta: '+3.1%' },
  { id: 3, title: 'Revenue', value: '$12,430', delta: '+12.5%' },
  { id: 4, title: 'Errors', value: 4, delta: '-18.0%' }
])

/** Sparkline data (simple numbers) */
const sparkData = ref([12, 18, 14, 22, 28, 24, 30, 26, 34, 40, 36, 44])

/** Recent activity */
const activities = ref([
  { id: 1, text: 'User Ahmed completed onboarding', time: '2m ago' },
  { id: 2, text: 'Payment processed for order #A123', time: '20m ago' },
  { id: 3, text: 'New API key created by Sara', time: '1h ago' },
  { id: 4, text: 'Deployment succeeded (v1.4.2)', time: '3h ago' }
])

/** Tasks */
const tasks = ref([
  { id: 1, title: 'Review PR #42', done: false },
  { id: 2, title: 'Update onboarding flow', done: true },
  { id: 3, title: 'Fix mobile layout bug', done: false }
])

/** Table rows */
const users = ref([
  { id: 'U001', name: 'Amine', role: 'Developer', status: 'Active' },
  { id: 'U002', name: 'Oday', role: 'Kaboul', status: 'Active' },
  { id: 'U003', name: 'Karim', role: 'Support', status: 'Idle' }
])

/** Derived values */
const totalUsers = computed(() => kpis.value.find(k => k.title === 'Active Users')?.value ?? 0)

/** Helpers for sparkline SVG */
function sparkPath(values: number[], width = 220, height = 48) {
  if (!values.length) return ''
  const max = Math.max(...values)
  const min = Math.min(...values)
  const len = values.length
  const step = width / (len - 1)
  const points = values.map((v, i) => {
    const x = i * step
    const y = height - ((v - min) / (max - min || 1)) * height
    return `${x},${y}`
  })
  return `M ${points.join(' L ')}`
}
</script>

<template>
  <div class="p-6 bg-slate-50 min-h-screen">
    <!-- Header -->
    <header class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-semibold text-slate-800">Axproo Dashboard</h2>
        <p class="text-sm text-slate-500">Overview and quick insights</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <div class="text-sm text-slate-500">Welcome back,</div>
          <div class="font-medium text-slate-800">{{ user.name }}</div>
        </div>
        <img :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
      </div>
    </header>

    <!-- Grid -->
    <main class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left: KPIs + Chart -->
      <section class="lg:col-span-8 space-y-6">
        <!-- KPI cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="k in kpis" :key="k.id" class="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <div class="text-sm text-slate-500">{{ k.title }}</div>
              <div class="text-2xl font-bold text-slate-800">{{ k.value }}</div>
            </div>
            <div class="text-sm text-green-600 font-medium">{{ k.delta }}</div>
          </div>
        </div>

        <!-- Main card with sparkline -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-slate-800">Usage Trend</h3>
              <p class="text-sm text-slate-500">Last 30 days — active sessions</p>
            </div>
            <div class="text-right">
              <div class="text-sm text-slate-500">Total</div>
              <div class="text-xl font-bold text-slate-800">{{ totalUsers }}</div>
            </div>
          </div>

          <!-- Sparkline + stats -->
          <div class="flex items-center gap-6">
            <div class="flex-1">
              <svg :width="240" :height="56" class="w-full h-14">
                <path :d="sparkPath(sparkData, 220, 48)" fill="none" stroke="#0ea5a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#0ea5a4" stop-opacity="0.12" />
                  <stop offset="100%" stop-color="#0ea5a4" stop-opacity="0" />
                </linearGradient>
                <path :d="sparkPath(sparkData, 220, 48) + ' L 220 56 L 0 56 Z'" fill="url(#g)" opacity="0.9" />
              </svg>
            </div>

            <div class="w-48">
              <div class="text-sm text-slate-500">Conversion</div>
              <div class="text-2xl font-bold text-slate-800">4.8%</div>
              <div class="text-sm text-slate-500 mt-2">Avg session 3m 12s</div>
            </div>
          </div>
        </div>

        <!-- Recent activity -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-semibold text-slate-800 mb-3">Recent Activity</h3>
          <ul class="space-y-3">
            <li v-for="a in activities" :key="a.id" class="flex items-center justify-between">
              <div class="text-sm text-slate-700">{{ a.text }}</div>
              <div class="text-xs text-slate-400">{{ a.time }}</div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Right: Tasks + Table -->
      <aside class="lg:col-span-4 space-y-6">
        <!-- Quick actions -->
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-slate-800">Quick Actions</h4>
            <button class="text-xs text-teal-600 font-medium">New</button>
          </div>
          <div class="flex flex-col gap-2">
            <button class="w-full text-left px-3 py-2 rounded-md bg-teal-50 text-teal-700 hover:bg-teal-100">Create Project</button>
            <button class="w-full text-left px-3 py-2 rounded-md bg-slate-50 text-slate-700 hover:bg-slate-100">Invite Member</button>
            <button class="w-full text-left px-3 py-2 rounded-md bg-slate-50 text-slate-700 hover:bg-slate-100">Generate Report</button>
          </div>
        </div>

        <!-- Tasks -->
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-slate-800">Tasks</h4>
            <div class="text-xs text-slate-400">{{ tasks.length }} items</div>
          </div>
          <ul class="space-y-2">
            <li v-for="t in tasks" :key="t.id" class="flex items-center gap-3">
              <input type="checkbox" v-model="t.done" class="h-4 w-4 text-teal-600 rounded" />
              <div :class="['text-sm', t.done ? 'line-through text-slate-400' : 'text-slate-700']">{{ t.title }}</div>
            </li>
          </ul>
        </div>

        <!-- Users table -->
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <h4 class="text-sm font-semibold text-slate-800 mb-3">Team</h4>
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs text-slate-500">
                <th class="pb-2">ID</th>
                <th class="pb-2">Name</th>
                <th class="pb-2">Role</th>
                <th class="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in users" :key="u.id" class="border-t">
                <td class="py-2 text-slate-700">{{ u.id }}</td>
                <td class="py-2 text-slate-700">{{ u.name }}</td>
                <td class="py-2 text-slate-700">{{ u.role }}</td>
                <td class="py-2">
                  <span :class="['px-2 py-1 rounded-full text-xs font-medium', u.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700']">
                    {{ u.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
</template>

<style scoped>
/* small visual polish */
svg { display: block; }
</style>
