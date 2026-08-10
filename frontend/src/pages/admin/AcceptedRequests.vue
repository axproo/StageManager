<script setup lang="ts">
import { computed } from "vue";
import { useInternshipStore } from "../../stores/InternshipStore";

const internshipStore = useInternshipStore();

const requests = computed(() => internshipStore.acceptedRequests);
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">
      Stages acceptés
    </h1>

    <div
      v-if="requests.length === 0"
      class="bg-white p-6 rounded shadow"
    >
      Aucun stage accepté
    </div>

    <div
      v-for="request in requests"
      :key="request.id"
      class="bg-white rounded shadow p-6 mb-5"
    >
      <h2 class="text-xl font-bold">
        {{ request.firstName }}
        {{ request.lastName }}
      </h2>

      <p>📧 {{ request.email }}</p>

      <p>📱 {{ request.phone }}</p>

      <p>🎓 {{ request.university }}</p>

      <p>💻 {{ request.speciality }}</p>

      <p>🏢 {{ request.department }}</p>

      <p class="text-green-600 mt-3">
        ✅ Statut : Accepté
      </p>
    </div>
  </div>
</template>