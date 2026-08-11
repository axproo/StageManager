<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInternshipStore } from "@/stores/InternshipStore";

const route = useRoute();
const router = useRouter();
const internshipStore = useInternshipStore();

const tabs = computed(() => [
  {
    key: "pending",
    label: "En attente",
    path: "/admin/requests",
    count: internshipStore.requests.filter((r) => r.status === "PENDING").length,
    activeColor: "border-amber-500 text-amber-600",
  },
  {
    key: "accepted",
    label: "Acceptées",
    path: "/admin/accepted",
    count: internshipStore.requests.filter((r) => r.status === "APPROVED").length,
    activeColor: "border-green-500 text-green-600",
  },
  {
    key: "rejected",
    label: "Refusées",
    path: "/admin/rejected",
    count: internshipStore.requests.filter((r) => r.status === "REJECTED").length,
    activeColor: "border-red-500 text-red-600",
  },
]);

function isTabActive(path: string) {
  return route.path === path;
}

function goToTab(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="flex gap-1 border-b border-gray-200 mb-6">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      @click="goToTab(tab.path)"
      class="relative px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px flex items-center gap-2"
      :class="isTabActive(tab.path)
        ? tab.activeColor
        : 'border-transparent text-gray-500 hover:text-gray-700'"
    >
      {{ tab.label }}
      <span
        class="text-xs font-bold px-2 py-0.5 rounded-full transition-colors duration-200"
        :class="isTabActive(tab.path) ? 'bg-current/10' : 'bg-gray-100 text-gray-500'"
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>