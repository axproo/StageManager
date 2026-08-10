<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInternshipStore } from "../../stores/InternshipStore";

const route = useRoute();
const router = useRouter();
const internshipStore = useInternshipStore();

interface InternshipForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  speciality: string;
  department: string;
  startDate: string;
  endDate: string;
  message: string;
}

const departments = [
  { slug: "developpement-web", label: "Développement Web" },
  { slug: "cybersecurite", label: "Cybersécurité" },
  { slug: "reseaux-infrastructure", label: "Réseau" },
  { slug: "devops", label: "DevOps" },
  { slug: "systeme", label: "Système" },
];

const initialForm = (): InternshipForm => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  university: "",
  speciality: "",
  department: "",
  startDate: "",
  endDate: "",
  message: "",
});

const form = ref<InternshipForm>(initialForm());
const errorMessage = ref("");
const isSubmitted = ref(false);
const submittedSummary = ref<InternshipForm | null>(null);

// Département pré-sélectionné depuis l'URL (?departement=cybersecurite)
const preselectedSlug = computed(() => route.query.departement as string | undefined);
const preselectedLabel = computed(() => {
  const match = departments.find((d) => d.slug === preselectedSlug.value);
  return match?.label ?? null;
});

onMounted(() => {
  if (preselectedLabel.value) {
    form.value.department = preselectedLabel.value;
  }
});

function goBackToDepartments() {
  router.push({ path: "/", hash: "#departements" });
}

function submitRequest() {
  errorMessage.value = "";

  if (
    !form.value.firstName ||
    !form.value.lastName ||
    !form.value.email ||
    !form.value.department
  ) {
    errorMessage.value = "Veuillez remplir les champs obligatoires (*)";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.value.email)) {
    errorMessage.value = "Merci d'indiquer une adresse email valide";
    return;
  }

  internshipStore.addRequest({
    id: Date.now(),
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    phone: form.value.phone,
    university: form.value.university,
    speciality: form.value.speciality,
    department: form.value.department,
    startDate: form.value.startDate,
    endDate: form.value.endDate,
    message: form.value.message,
    status: "PENDING",
  });

  submittedSummary.value = { ...form.value };
  isSubmitted.value = true;
  form.value = initialForm();
}

function submitAnotherRequest() {
  isSubmitted.value = false;
  submittedSummary.value = null;
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex justify-center px-6 py-28">
    <div class="w-full max-w-3xl">

      <!-- ÉTAT SUCCÈS (remplace le formulaire, sans redirection) -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
      >
        <div
          v-if="isSubmitted && submittedSummary"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center"
        >
          <div class="flex justify-center mb-6">
            <div class="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center animate-check-pop">
              <svg
                class="w-10 h-10 text-green-600"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mb-2">Demande envoyée avec succès</h2>
          <p class="text-gray-500 mb-8 max-w-md mx-auto">
            Merci {{ submittedSummary.firstName }}, votre candidature a bien été transmise à
            notre équipe. Vous recevrez une réponse par email sous 48 à 72h.
          </p>

          <!-- Résumé de la demande -->
          <div class="bg-blue-50 border border-blue-100 rounded-xl p-6 text-left mb-8">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <div class="text-xs text-blue-600 font-medium mb-0.5">Candidat</div>
                <div class="text-sm font-semibold text-gray-900">
                  {{ submittedSummary.firstName }} {{ submittedSummary.lastName }}
                </div>
              </div>
              <div>
                <div class="text-xs text-blue-600 font-medium mb-0.5">Département</div>
                <div class="text-sm font-semibold text-gray-900">
                  {{ submittedSummary.department }}
                </div>
              </div>
              <div>
                <div class="text-xs text-blue-600 font-medium mb-0.5">Email</div>
                <div class="text-sm font-semibold text-gray-900">
                  {{ submittedSummary.email }}
                </div>
              </div>
              <div v-if="submittedSummary.startDate">
                <div class="text-xs text-blue-600 font-medium mb-0.5">Date souhaitée</div>
                <div class="text-sm font-semibold text-gray-900">
                  {{ submittedSummary.startDate }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-3">
            <button
              @click="router.push('/')"
              class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Retour à l'accueil
            </button>
            <button
              @click="submitAnotherRequest"
              class="border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Faire une autre demande
            </button>
          </div>
        </div>
      </Transition>

      <!-- FORMULAIRE -->
      <div v-if="!isSubmitted" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
        <div class="text-center mb-8">
          <span class="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3 px-4 py-1 bg-blue-50 rounded-full">
            AXPROO · Candidature
          </span>
          <h1 class="text-3xl font-bold text-gray-900">Demande de stage</h1>
          <p class="text-gray-500 mt-2">
            Remplissez ce formulaire, notre équipe vous répond sous 48 à 72h.
          </p>
        </div>

        <!-- Bandeau département présélectionné -->
        <div
          v-if="preselectedLabel"
          class="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-8"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div>
              <div class="text-xs text-blue-600 font-medium">Vous postulez pour</div>
              <div class="text-sm font-bold text-gray-900">{{ preselectedLabel }}</div>
            </div>
          </div>
          <button
            @click="goBackToDepartments"
            class="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors underline"
          >
            Changer
          </button>
        </div>

        <!-- Message d'erreur -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2"
          >
            <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {{ errorMessage }}
          </div>
        </Transition>

        <form class="space-y-6" @submit.prevent="submitRequest">
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Prénom *</label>
              <input
                v-model="form.firstName"
                type="text"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
              <input
                v-model="form.lastName"
                type="text"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Université</label>
              <input
                v-model="form.university"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Spécialité</label>
              <input
                v-model="form.speciality"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Département souhaité *</label>
            <select
              v-model="form.department"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
            >
              <option value="">Choisir un département</option>
              <option v-for="dept in departments" :key="dept.slug" :value="dept.label">
                {{ dept.label }}
              </option>
            </select>
          </div>

          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Date début</label>
              <input
                v-model="form.startDate"
                type="date"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Date fin</label>
              <input
                v-model="form.endDate"
                type="date"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Parlez-nous brièvement de votre projet de stage..."
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            class="group w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2"
          >
            Envoyer la demande
            <svg
              class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
            >
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes check-pop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
.animate-check-pop {
  animation: check-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>