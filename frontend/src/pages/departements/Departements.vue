<template>
  <div class="bg-gray-50 min-h-screen pt-24 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">
            {{ t("departments.title") }}
          </h1>

          <p class="text-gray-500 mt-1">
            {{ t("departments.description") }}
          </p>
        </div>

        <ButtonUi
          :title="t('departments.add')"
          variant="primary"
          size="sm"
          @click="openAddModal"
        />
      </div>

      <!-- SEARCH -->
      <div class="mb-6">
        <input
          v-model="search"
          type="text"
          :placeholder="t('departments.search')"
          class="w-full md:w-96 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#200a83]"
        />
      </div>

      <!-- DEPARTMENTS CARDS -->
      <div
        v-if="filteredDepartments.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="department in filteredDepartments"
          :key="department.id"
          class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition duration-200"
        >
          <!-- ICON -->
          <div class="flex items-center justify-between mb-5">
            <div
              class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-[#200a83]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-2M5 21H3m2 0h2M9 7h6M9 11h6M9 15h6"
                />
              </svg>
            </div>
          </div>

          <!-- NAME -->
          <h2 class="text-lg font-semibold text-slate-800 mb-2">
            {{
              department.key
                ? t(`departmentsList.${department.key}`)
                : department.name
            }}
          </h2>

          <!-- DESCRIPTION -->
          <p class="text-sm text-gray-500 mb-6">
            {{ t("departments.available") }}
          </p>

          <!-- ACTIONS -->
          <div class="flex items-center gap-3 border-t pt-4">
            <!-- EDIT -->
            <button
              :title="t('actions.edit')"
              class="flex-1 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition"
              @click="editDepartment(department)"
            >
              <Pencil :size="20" />
            </button>

            <!-- DELETE -->
            <button
              :title="t('actions.delete')"
              class="flex-1 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-2 rounded-lg transition"
              @click="deleteDepartment(department.id)"
            >
              <Trash2 :size="20" />
            </button>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div
        v-else
        class="bg-white rounded-xl border border-gray-200 py-16 text-center"
      >
        <div class="text-gray-400 text-5xl mb-4">📂</div>

        <h3 class="text-lg font-semibold text-gray-700">
          {{ t("departments.empty.title") }}
        </h3>

        <p class="text-gray-500 mt-2">
          {{ t("departments.empty.description") }}
        </p>
      </div>
    </div>

    <!-- ADD / EDIT MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <!-- MODAL HEADER -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-slate-800">
            {{
              isEditing
                ? t("departments.modal.editTitle")
                : t("departments.modal.addTitle")
            }}
          </h2>

          <button
            :title="t('departments.modal.close')"
            class="text-gray-400 hover:text-gray-700 text-2xl"
            @click="closeModal"
          >
            ×
          </button>
        </div>

        <!-- FORM -->
        <form @submit.prevent="saveDepartment">
          <!-- NAME LABEL -->
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t("departments.modal.nameLabel") }}
          </label>

          <!-- NAME INPUT -->
          <input
            v-model="departmentForm.name"
            type="text"
            :placeholder="t('departments.modal.namePlaceholder')"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#200a83]"
          />

          <!-- ERROR -->
          <p v-if="error" class="text-red-500 text-sm mt-2">
            {{ error }}
          </p>

          <!-- BUTTONS -->
          <div class="flex justify-end gap-3 pt-4">
            <!-- CANCEL -->
            <ButtonUi
              type="button"
              :title="t('departments.modal.cancel')"
              variant="danger"
              @click="closeModal"
            />

            <!-- SAVE -->
            <ButtonUi
              type="submit"
              :title="t('departments.modal.save')"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>

    <!-- DELETE MODAL -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <!-- DELETE TITLE -->
        <h2 class="text-xl font-bold text-slate-800 mb-3">
          {{ t("departments.delete.title") }}
        </h2>

        <!-- DELETE DESCRIPTION -->
        <p class="text-gray-500 mb-6">
          {{ t("departments.delete.description") }}
        </p>

        <!-- BUTTONS -->
        <div class="flex justify-end gap-3">
          <!-- CANCEL -->
          <ButtonUi
            :title="t('departments.delete.cancel')"
            variant="danger"
            @click="showDeleteModal = false"
          />

          <!-- DELETE -->
          <ButtonUi
            :title="t('departments.delete.confirm')"
            variant="primary"
            @click="confirmDeleteDepartment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ButtonUi from "@components/ui/buttons/ButtonUi.vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";

const defaultDepartments = [
  {
    id: 1,
    key: "webDevelopment",
  },
  {
    id: 2,
    key: "mobileDevelopment",
  },
  {
    id: 3,
    key: "cybersecurity",
  },
  {
    id: 4,
    key: "dataScience",
  },
  {
    id: 5,
    key: "artificialIntelligence",
  },
  {
    id: 6,
    key: "networks",
  },
  {
    id: 7,
    key: "uiuxDesign",
  },
  {
    id: 8,
    key: "marketing",
  },
  {
    id: 9,
    key: "humanResources",
  },
];
const showDeleteModal = ref(false);
const departmentToDelete = ref(null);
const storedDepartments = localStorage.getItem("departments");
const { t } = useI18n();
const departments = ref(
  storedDepartments ? JSON.parse(storedDepartments) : defaultDepartments,
);
const search = ref("");

const showModal = ref(false);

const isEditing = ref(false);

const error = ref("");

const departmentForm = ref({
  id: null,
  name: "",
});

const filteredDepartments = computed(() => {
  return departments.value.filter((department) => {
    const departmentName = department.key
      ? t(`departmentsList.${department.key}`)
      : department.name;

    return departmentName.toLowerCase().includes(search.value.toLowerCase());
  });
});
const saveToLocalStorage = () => {
  localStorage.setItem("departments", JSON.stringify(departments.value));
};

const openAddModal = () => {
  isEditing.value = false;
  error.value = "";

  departmentForm.value = {
    id: null,
    name: "",
  };

  showModal.value = true;
};

const editDepartment = (department) => {
  isEditing.value = true;
  error.value = "";
  departmentForm.value = {
    id: department.id,
    name: department.key
      ? t(`departmentsList.${department.key}`)
      : department.name,
  };
  showModal.value = true;
};

const saveDepartment = () => {
  const name = departmentForm.value.name.trim();

  // Validation
  if (!name) {
    error.value = t("departments.messages.required");
    return;
  }

  // Vérifier si un département existe déjà
  const alreadyExists = departments.value.some((department) => {
    const departmentName = department.key
      ? t(`departmentsList.${department.key}`)
      : department.name;

    return (
      departmentName.toLowerCase() === name.toLowerCase() &&
      department.id !== departmentForm.value.id
    );
  });

  if (alreadyExists) {
    error.value = t("departments.messages.alreadyExists");
    return;
  }

  // MODIFICATION
  if (isEditing.value) {
    const index = departments.value.findIndex(
      (department) => department.id === departmentForm.value.id,
    );

    if (index !== -1) {
      const department = departments.value[index];

      // Si c'est un département par défaut traduit
      if (department.key) {
        // On remplace la clé par un nom personnalisé
        departments.value[index] = {
          id: department.id,
          name,
        };
      } else {
        // Département personnalisé
        departments.value[index].name = name;
      }
    }
  }

  // AJOUT
  else {
    const nextId =
      departments.value.length > 0
        ? Math.max(
            ...departments.value.map((department) => Number(department.id)),
          ) + 1
        : 1;

    departments.value.push({
      id: nextId,
      name,
    });
  }

  toast.success(t("departments.messages.success"));

  saveToLocalStorage();
  closeModal();
};
const deleteDepartment = (id) => {
  departmentToDelete.value = id;

  showDeleteModal.value = true;
};
const confirmDeleteDepartment = () => {
  if (departmentToDelete.value === null) return;

  departments.value = departments.value.filter(
    (department) => Number(department.id) !== Number(departmentToDelete.value),
  );
  toast.success(t("departments.messages.success"));
  saveToLocalStorage();

  departmentToDelete.value = null;
  showDeleteModal.value = false;
};

const closeModal = () => {
  showModal.value = false;
  error.value = "";
};
</script>
