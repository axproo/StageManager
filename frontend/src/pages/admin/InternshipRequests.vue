<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInternshipStore } from "../../stores/InternshipStore";

const route = useRoute();
const router = useRouter();
const internshipStore = useInternshipStore();

const selectedRequestId = ref<number | null>(null);

onMounted(() => {
  internshipStore.loadRequests();
  const requestId = route.query.requestId;
  if (requestId) {
    const id = Number(requestId);
    if (!Number.isNaN(id)) selectedRequestId.value = id;
  }
});

const requests = computed(() =>
  internshipStore.requests.filter((r) => r.status === "PENDING")
);

const selectedRequest = computed(() => {
  if (selectedRequestId.value === null) return null;
  return internshipStore.requests.find((r) => r.id === selectedRequestId.value) ?? null;
});

function showDetails(id: number) {
  selectedRequestId.value = id;
  router.push({ path: "/admin/requests", query: { requestId: id.toString() } });
}

function backToRequests() {
  selectedRequestId.value = null;
  router.push("/admin/requests");
}

function acceptRequest(id: number) {
  internshipStore.approveRequest(id);
  selectedRequestId.value = null;
  router.push("/admin/requests");
}

function rejectRequest(id: number) {
  internshipStore.rejectRequest(id);
  selectedRequestId.value = null;
  router.push("/admin/requests");
}

const infoFields = (r: any) => [
  { label: "Prénom", value: r.firstName },
  { label: "Nom", value: r.lastName },
  { label: "Email", value: r.email },
  { label: "Téléphone", value: r.phone },
  { label: "Université", value: r.university },
  { label: "Spécialité", value: r.speciality },
  { label: "Département", value: r.department },
  { label: "Date de début", value: r.startDate },
  { label: "Date de fin", value: r.endDate },
];

const icons: Record<string, string> = {
  back: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  x: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  school: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 3 3 6 3s6-1.34 6-3v-5"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
};
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">

    <!-- MODE DÉTAIL -->
    <template v-if="selectedRequest">
      <div class="flex items-center gap-4 mb-8">
        <button
          type="button"
          @click="backToRequests"
          class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
        >
          <svg class="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.back"></svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Détails de la demande</h1>
          <p class="text-gray-500 mt-0.5 text-sm">Demande #{{ selectedRequest.id }}</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-transparent">
          <div class="flex justify-between items-center flex-wrap gap-3">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {{ selectedRequest.firstName[0] }}{{ selectedRequest.lastName[0] }}
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">
                  {{ selectedRequest.firstName }} {{ selectedRequest.lastName }}
                </h2>
                <p class="text-gray-500 text-sm mt-0.5">Demande de stage</p>
              </div>
            </div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-semibold">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" v-html="icons.clock"></svg>
              En attente
            </span>
          </div>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="field in infoFields(selectedRequest)" :key="field.label">
              <p class="text-xs text-gray-400 font-medium uppercase tracking-wide">{{ field.label }}</p>
              <p class="font-semibold text-gray-900 mt-1">{{ field.value || "—" }}</p>
            </div>
          </div>

          <div class="mt-8">
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Message du stagiaire</p>
            <div class="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <p class="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                {{ selectedRequest.message || "Aucun message." }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button
            type="button"
            @click="rejectRequest(selectedRequest.id)"
            class="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all duration-200 flex items-center gap-2"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" v-html="icons.x"></svg>
            Refuser
          </button>
          <button
            type="button"
            @click="acceptRequest(selectedRequest.id)"
            class="px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" v-html="icons.check"></svg>
            Accepter
          </button>
        </div>
      </div>
    </template>

    <!-- MODE LISTE -->
    <template v-else>
      <div class="mb-8">
        <span class="inline-block text-blue-600 text-xs font-semibold tracking-wider uppercase mb-2 px-3 py-1 bg-blue-50 rounded-full">
          {{ requests.length }} en attente
        </span>
        <h1 class="text-3xl font-bold text-gray-900">Demandes de stage</h1>
        <p class="text-gray-500 mt-1">Gestion des demandes de stage en attente</p>
      </div>

      <div v-if="requests.length === 0" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div class="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
          <svg class="w-7 h-7 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="icons.inbox"></svg>
        </div>
        <h2 class="text-lg font-semibold text-gray-800">Aucune demande en attente</h2>
        <p class="text-gray-500 mt-1.5 text-sm">
          Il n'y a actuellement aucune demande de stage à traiter.
        </p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="request in requests"
          :key="request.id"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md"
        >
          <div class="flex justify-between items-start gap-4 flex-wrap">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
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
                    <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.phone"></svg>
                    {{ request.phone || "—" }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.school"></svg>
                    {{ request.university || "—" }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.code"></svg>
                    {{ request.speciality || "—" }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.building"></svg>
                    {{ request.department }}
                  </span>
                </div>
                <p class="flex items-center gap-1.5 mt-2 text-sm text-gray-400">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.calendar"></svg>
                  {{ request.startDate || "—" }} → {{ request.endDate || "—" }}
                </p>
              </div>
            </div>

            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold flex-shrink-0">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" v-html="icons.clock"></svg>
              En attente
            </span>
          </div>

          <div class="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
            <button
              type="button"
              @click="showDetails(request.id)"
              class="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-200 text-sm"
            >
              Voir les détails
            </button>
            <button
              type="button"
              @click="rejectRequest(request.id)"
              class="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all duration-200 text-sm"
            >
              Refuser
            </button>
            <button
              type="button"
              @click="acceptRequest(request.id)"
              class="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>