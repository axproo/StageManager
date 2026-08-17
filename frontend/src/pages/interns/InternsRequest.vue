<template>
  <div class="bg-gray-50 min-h-screen w-full pt-24 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">Demandes de stage</h1>

          <p class="text-gray-500 mt-2">
            Consultez, acceptez ou refusez les demandes de stage
          </p>
        </div>
      </div>

      <!-- SEARCH -->
      <div class="mb-6">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher une demande..."
          class="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- TABLE -->
      <div class="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b text-gray-500">
              <th class="p-4 text-left">Nom</th>

              <th class="p-4 text-left">Email</th>

              <th class="p-4 text-left">Département</th>

              <th class="p-4 text-left">Motivation</th>

              <th class="p-4 text-left">Date</th>

              <th class="p-4 text-left">Statut</th>

              <th class="p-4 text-center">CV</th>

              <th class="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="request in filteredRequests"
              :key="request.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="p-4 font-semibold text-slate-700">
                {{ request.name }}
              </td>

              <td class="p-4 text-gray-500">
                {{ request.email }}
              </td>

              <td class="p-4 text-gray-700">
                {{ request.department }}
              </td>
              <td class="p-4 text-gray-700">
                <div
                  class="max-h-32 overflow-y-auto break-all whitespace-normal"
                >
                  {{ request.motivation }}
                </div>
              </td>
              <td class="p-4 text-gray-600">
                {{ request.createdDate }}
              </td>

              <td class="p-4">
                <span
                  class="px-4 py-1 rounded-full text-sm font-semibold"
                  :class="badgeClass(request.status)"
                >
                  {{ request.status }}
                </span>
              </td>

              <!-- TELECHARGER CV -->
              <td class="p-4 text-center">
                <a
                  :href="request.cv"
                  download
                  class="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Télécharger
                </a>
              </td>

              <!-- ACTIONS -->
              <td class="p-4">
                <div class="flex justify-center gap-3">
                  <button
                    :disabled="request.status === 'Accepté'"
                    class="px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
                    @click="accept(request)"
                  >
                    Accepter
                  </button>

                  <button
                    :disabled="request.status === 'Refusé'"
                    class="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                    @click="reject(request)"
                  >
                    Refuser
                  </button>
                </div>
              </td>
            </tr>

            <!-- EMPTY STATE -->
            <tr v-if="filteredRequests.length === 0">
              <td colspan="7" class="text-center py-8 text-gray-500">
                Aucune demande trouvée
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";

const search = ref("");
const requests = reactive(
  JSON.parse(localStorage.getItem("internRequest") || "[]"),
);
const filteredRequests = computed(() =>
  requests.filter((r) =>
    `${r.name} ${r.email} ${r.department}`
      .toLowerCase()
      .includes(search.value.toLowerCase()),
  ),
);

const updateStatus = (id, status) => {
  const request = requests.find((item) => item.id === id);
  if (request) {
    request.status = status;

    localStorage.setItem("internRequest", JSON.stringify(requests));
  }
};

const accept = (request) => {
  updateStatus(request.id, "Accepté");
};

const reject = (request) => {
  updateStatus(request.id, "Refusé");
};

const badgeClass = (status) => {
  switch (status) {
    case "Accepté":
      return "bg-green-100 text-green-700";

    case "Refusé":
      return "bg-red-100 text-red-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
};
</script>
<style scoped>
td {
  width: 200px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
