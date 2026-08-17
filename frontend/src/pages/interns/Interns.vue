<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";
import ButtonUi from "@components/ui/buttons/ButtonUi.vue";
import InternRequestForm from "@/components/forms/InternRequestForm.vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAppStore } from "@stores/user.store";
import { useI18n } from "vue-i18n";

const router = useRouter();
const store = useAppStore();
const userRole = store.role;
const { t } = useI18n();

const departments = [
  "Développement Web",
  "Développement Mobile",
  "Cybersécurité",
  "Data Science",
  "Intelligence Artificielle",
  "Réseaux",
  "Design UI/UX",
  "Marketing",
  "Ressources Humaines",
];

// ===============================
// DEMANDES DE STAGE
// ===============================

const defaultRequests = [
  {
    id: 1,
    name: "Ahmed",
    email: "ahmed@test.com",
    department: "Développement Web",
    status: "Accepté",
    motivation: "Stage d'été",
    cv: "cv.pdf",
    createdDate: null,
  },
];

const registeredInterRequest = JSON.parse(
  localStorage.getItem("internRequest") || JSON.stringify(defaultRequests),
);

// initialisation
if (!localStorage.getItem("internRequest")) {
  localStorage.setItem("internRequest", JSON.stringify(registeredInterRequest));
}

// ===============================
// SYNCHRONISATION DES STAGIAIRES
// ===============================

const syncInterns = () => {
  // demandes acceptées
  const acceptedRequests = registeredInterRequest.filter(
    (request) => request.status === "Accepté",
  );

  // stagiaires ajoutés par admin
  const adminInterns = JSON.parse(localStorage.getItem("adminInterns") || "[]");

  const allInterns = [...adminInterns, ...acceptedRequests];

  localStorage.setItem("interns", JSON.stringify(allInterns));

  return allInterns;
};

let registeredInterns = syncInterns();

// ===============================
// MODALE
// ===============================

const showModal = ref(false);

const modalMode = ref("add");

const internForm = ref({
  id: null,
  name: "",
  email: "",
  department: "",
  status: "Accepté",
});

const showDeleteModal = ref(false);

const internToDelete = ref(null);

// ===============================
// AJOUT
// ===============================

const openAddModal = () => {
  modalMode.value = "add";

  internForm.value = {
    id: null,
    name: "",
    email: "",
    department: "",
    status: "Accepté",
  };

  showModal.value = true;
};

const saveIntern = () => {
  if (
    !internForm.value.name ||
    !internForm.value.email ||
    !internForm.value.department
  ) {
    toast.error(t("fillAllFields"));

    return;
  }

  if (modalMode.value === "add") {
    const adminInterns = JSON.parse(
      localStorage.getItem("adminInterns") || "[]",
    );

    const nextId = adminInterns.length
      ? Math.max(...adminInterns.map((intern) => intern.id)) + 1
      : 1;

    adminInterns.push({
      ...internForm.value,
      id: nextId,
    });

    localStorage.setItem("adminInterns", JSON.stringify(adminInterns));

    toast.success(t("interAddedSuccessfully"));
  } else {
    // chercher dans les stagiaires ajoutés par admin
    const adminInterns = JSON.parse(
      localStorage.getItem("adminInterns") || "[]",
    );

    const adminIndex = adminInterns.findIndex(
      (item) => item.id === internForm.value.id,
    );

    if (adminIndex !== -1) {
      adminInterns[adminIndex] = {
        ...adminInterns[adminIndex],
        ...internForm.value,
      };

      localStorage.setItem("adminInterns", JSON.stringify(adminInterns));

      toast.success(t("updatedSuccessfullyMessage"));
    } else {
      // sinon chercher dans les demandes acceptées
      const requestIndex = registeredInterRequest.findIndex(
        (item) => item.id === internForm.value.id,
      );

      if (requestIndex !== -1) {
        registeredInterRequest[requestIndex] = {
          ...registeredInterRequest[requestIndex],
          ...internForm.value,
        };

        localStorage.setItem(
          "internRequest",
          JSON.stringify(registeredInterRequest),
        );

        toast.success(t("updatedSuccessfullyMessage"));
      }
    }
  }

  // reconstruire la liste finale
  registeredInterns = syncInterns();

  closeModal();
};

// ===============================
// MODIFICATION
// ===============================

const editIntern = (intern) => {
  modalMode.value = "edit";

  internForm.value = {
    id: intern.id,

    name: intern.name,

    email: intern.email,

    department: intern.department,

    status: intern.status,
  };

  showModal.value = true;
};

// ===============================
// SUPPRESSION
// ===============================

const deleteIntern = (id) => {
  internToDelete.value = id;

  showDeleteModal.value = true;
};

const confirmDelete = () => {
  const id = internToDelete.value;

  // 1) Supprimer des stagiaires ajoutés par admin
  const adminInterns = JSON.parse(localStorage.getItem("adminInterns") || "[]");

  const updatedAdminInterns = adminInterns.filter((item) => item.id !== id);

  localStorage.setItem("adminInterns", JSON.stringify(updatedAdminInterns));

  // 2) Supprimer des demandes de stage
  const updatedRequests = registeredInterRequest.filter(
    (item) => item.id !== id,
  );

  localStorage.setItem("internRequest", JSON.stringify(updatedRequests));

  // mettre à jour le tableau local
  registeredInterRequest.splice(
    0,
    registeredInterRequest.length,
    ...updatedRequests,
  );

  // 3) Recréer la liste finale des stagiaires
  registeredInterns = syncInterns();

  showDeleteModal.value = false;

  toast.success(t("deletedIntern"));
};

// ===============================
// FORMULAIRE DEMANDE
// ===============================

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = reject;
  });
};

const submitRequest = async (data) => {
  const nextId = registeredInterRequest.length
    ? Math.max(...registeredInterRequest.map((r) => r.id)) + 1
    : 1;

  const cvBase64 = await fileToBase64(data.cv);

  registeredInterRequest.push({
    id: nextId,

    name: data.name,

    email: data.email,

    department: data.department,

    status: "En attente",

    motivation: data.message,

    cv: cvBase64,

    createdDate: Date.now(),
  });

  localStorage.setItem("internRequest", JSON.stringify(registeredInterRequest));

  router.push("/dashboard");

  toast.success(t("requestSentSuccessfully"));
};

// ===============================

const closeModal = () => {
  showModal.value = false;

  internForm.value = {
    id: null,

    name: "",

    email: "",

    department: "",

    status: "Accepté",
  };
};
</script>
<template>
  <div class="bg-gray-50 min-h-screen w-full pt-24 px-6">
    <div v-if="userRole === 'ADMIN'">
      <!-- HEADER -->

      <div class="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">
            Gestion des stagiaires
          </h1>

          <p class="text-gray-500 mt-2">
            Gérez les stagiaires et les demandes de stage
          </p>
        </div>
        <ButtonUi
          :title="'+ Ajouter stagiaire'"
          variant="primary"
          size="sm"
          @click="openAddModal"
        />
      </div>

      <!-- TABLE -->

      <div
        class="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 overflow-x-auto"
      >
        <table class="w-full">
          <thead>
            <tr class="border-b text-gray-500">
              <th class="p-4 text-left">Nom</th>

              <th class="p-4 text-left">Email</th>

              <th class="p-4 text-left">Département</th>

              <th class="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="intern in registeredInterns"
              :key="intern.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="p-4 font-semibold text-slate-700">
                {{ intern.name }}
              </td>

              <td class="p-4 text-gray-500">
                {{ intern.email }}
              </td>

              <td class="p-4 text-gray-700">
                {{ intern.department }}
              </td>

              <td class="p-4">
                <div class="flex justify-center gap-4">
                  <button
                    class="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                    title="Modifier"
                    @click="editIntern(intern)"
                  >
                    <Pencil :size="20" />
                  </button>

                  <button
                    class="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                    title="Supprimer"
                    @click="deleteIntern(intern.id)"
                  >
                    <Trash2 :size="20" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="registeredInterns.length === 0">
              <td colspan="7" class="text-center py-8 text-gray-500">
                Aucun stagiaire trouvé
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else-if="userRole === 'INTERN'">
      <InternRequestForm @submit="submitRequest" />
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h2 class="text-2xl font-bold mb-6">
          {{
            modalMode === "add"
              ? "Ajouter un stagiaire"
              : "Modifier un stagiaire"
          }}
        </h2>

        <form class="space-y-4" @submit.prevent="saveIntern">
          <input
            v-model="internForm.name"
            type="text"
            placeholder="Nom complet"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />

          <input
            v-model="internForm.email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />

          <select
            v-model="internForm.department"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          >
            <option disabled value="">Choisir un département</option>

            <option v-for="dep in departments" :key="dep" :value="dep">
              {{ dep }}
            </option>
          </select>

          <div class="flex justify-end gap-3 pt-4">
            <ButtonUi
              type="button"
              :title="'Annuler'"
              variant="danger"
              @click="closeModal"
            />

            <ButtonUi type="submit" :title="'Sauvegarder'" variant="primary" />
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 class="text-xl font-bold text-slate-800 mb-3">
          Voulez vous vraiment supprimer le stagiaire ?
        </h2>

        <p class="text-gray-500 mb-6">Cette action est irréversible.</p>

        <div class="flex justify-end gap-3">
          <ButtonUi
            :title="'Annuler'"
            variant="danger"
            @click="showDeleteModal = false"
          />
          <ButtonUi
            :title="'Supprimer'"
            variant="primary"
            @click="confirmDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>
