<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useInternshipStore } from "../../stores/InternshipStore";
import RequestsTabBar from "@/components/ui/RequestsTabBar.vue";

const internshipStore = useInternshipStore();

onMounted(() => {
  internshipStore.loadRequests();
});

const requests = computed(() =>
  internshipStore.requests.filter((r) => r.status === "REJECTED")
);

const icons: Record<string, string> = {
  x: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/>',
};
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="mb-6">
      <span class="inline-block text-blue-600 text-xs font-semibold tracking-wider uppercase mb-2 px-3 py-1 bg-blue-50 rounded-full">
        Gestion des candidatures
      </span>
      <h1 class="text-3xl font-bold text-gray-900">Demandes de stage</h1>
      <p class="text-gray-500 mt-1">Gérez les candidatures reçues par département</p>
    </div>

    <RequestsTabBar />

    <div v-if="requests.length === 0" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
      <div class="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
        <svg class="w-7 h-7 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="icons.inbox"></svg>
      </div>
      <h2 class="text-lg font-semibold text-gray-800">Aucune demande refusée</h2>
      <p class="text-gray-500 mt-1.5 text-sm">Les demandes refusées apparaîtront ici.</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="request in requests"
        :key="request.id"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-90"
      >
        <div class="flex justify-between items-start gap-4 flex-wrap">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold flex-shrink-0">
              {{ request.firstName[0] }}{{ request.lastName[0] }}
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-900">
                {{ request.firstName }} {{ request.lastName }}
              </h2>
              <div class="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm text-gray-500">
                <span class="flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.mail"></svg>
                  {{ request.email }}
                </span>
                <span class="flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.building"></svg>
                  {{ request.department }}
                </span>
              </div>
            </div>
          </div>

          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold flex-shrink-0">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" v-html="icons.x"></svg>
            Refusée
          </span>
        </div>
      </div>
    </div>
  </div>
</template>