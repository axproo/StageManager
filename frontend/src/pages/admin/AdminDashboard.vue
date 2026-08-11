<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useInternshipStore } from "../../stores/InternshipStore";
import { icons } from "@/constants/icons";
import StatCard from "@/components/ui/StatCard.vue";

const router = useRouter();
const internshipStore = useInternshipStore();

const showNotifications = ref(false);

onMounted(() => {
  internshipStore.loadRequests();
});

const pendingRequests = computed(() =>
  internshipStore.requests.filter((r) => r.status === "PENDING")
);
const pendingCount = computed(() => pendingRequests.value.length);
const acceptedCount = computed(
  () => internshipStore.requests.filter((r) => r.status === "APPROVED").length
);
const rejectedCount = computed(
  () => internshipStore.requests.filter((r) => r.status === "REJECTED").length
);
const totalCount = computed(() => internshipStore.requests.length);

const notifications = computed(() =>
  pendingRequests.value.map((r) => ({
    id: r.id,
    message: `Nouvelle demande de stage de ${r.firstName} ${r.lastName}`,
    department: r.department,
  }))
);

function toggleNotifications() {
  showNotifications.value = !showNotifications.value;
}

function goToRequests() {
  showNotifications.value = false;
  router.push("/admin/requests");
}

function openNotification(requestId: number) {
  showNotifications.value = false;
  router.push({ path: "/admin/requests", query: { requestId: requestId.toString() } });
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <!-- HEADER -->
    <div class="flex flex-wrap justify-between items-center gap-4 mb-8">
      <div>
        <span class="inline-block text-blue-600 text-xs font-semibold tracking-wider uppercase mb-2 px-3 py-1 bg-blue-50 rounded-full">
          Vue d'ensemble
        </span>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p class="text-gray-500 mt-1">Gestion des demandes de stage</p>
      </div>

      <!-- NOTIFICATIONS -->
      <div class="relative">
        <button
          type="button"
          @click="toggleNotifications"
          class="bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2.5 hover:border-blue-200 hover:shadow-md transition-all duration-300"
        >
          <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.bell"></svg>
          <span class="font-medium text-gray-700 text-sm">Notifications</span>
          <span
            v-if="notifications.length > 0"
            class="bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
          >
            {{ notifications.length }}
          </span>
        </button>

        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="showNotifications"
            class="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
          >
            <div class="flex justify-between items-center p-4 border-b border-gray-100">
              <div>
                <h2 class="font-semibold text-gray-900">Notifications</h2>
                <p class="text-xs text-gray-500 mt-0.5">Nouvelles demandes de stage</p>
              </div>
              <span class="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {{ notifications.length }}
              </span>
            </div>

            <div v-if="notifications.length === 0" class="p-8 text-center">
              <div class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="icons['bell-off']"></svg>
              </div>
              <p class="text-gray-500 text-sm">Aucune nouvelle demande.</p>
            </div>

            <div v-else class="max-h-80 overflow-y-auto">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="p-4 border-b border-gray-50 last:border-b-0 hover:bg-blue-50/40 transition-colors duration-200"
              >
                <div class="flex items-start gap-3">
                  <div class="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.mail"></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900 text-sm">Nouvelle demande</p>
                    <p class="text-sm text-gray-500 mt-0.5">{{ notification.message }}</p>
                    <button
                      type="button"
                      @click="openNotification(notification.id)"
                      class="text-sm text-blue-600 font-semibold mt-2 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                    >
                      Voir les détails
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-3 border-t border-gray-100">
              <button
                type="button"
                @click="goToRequests"
                class="w-full py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
              >
                Voir toutes les demandes
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- STATISTIQUES -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatCard label="En attente" :value="pendingCount" icon="clock" color="amber" />
      <StatCard label="Acceptées" :value="acceptedCount" icon="check" color="green" />
      <StatCard label="Refusées" :value="rejectedCount" icon="x" color="red" />
      <StatCard label="Total des demandes" :value="totalCount" icon="inbox" color="blue" />
    </div>

    <!-- RÉSUMÉ -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.inbox"></svg>
        </div>
        <div>
          <h2 class="text-lg font-bold text-gray-900">Résumé</h2>
          <p class="text-gray-500 mt-1 text-sm">
            Consultez les notifications pour accéder aux nouvelles demandes de stage.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>