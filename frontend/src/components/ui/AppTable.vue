<script setup>
defineProps({
  columns: {
    type: Array,
    default: () => [],
  },

  rows: {
    type: Array,
    default: () => [],
  },

  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="w-full overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
    <!-- Loading -->

    <div v-if="loading" class="p-6 text-center text-gray-500">Chargement...</div>

    <!-- Table -->

    <table v-else class="w-full text-left">
      <!-- Header -->

      <thead class="bg-gray-50 border-b">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 text-sm font-semibold text-gray-700"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <!-- Body -->

      <tbody>
        <!-- Rows -->

        <tr
          v-for="(row, index) in rows"
          :key="row.id || index"
          class="border-b hover:bg-gray-50 transition"
        >
          <td v-for="column in columns" :key="column.key" class="px-6 py-4 text-sm text-gray-600">
            <!-- Slot personnalisé -->

            <slot :name="column.key" :row="row">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>

        <!-- Empty -->

        <tr v-if="rows.length === 0">
          <td :colspan="columns.length" class="text-center py-6 text-gray-500">Aucun résultat</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
