```vue
<script setup>
import { reactive } from "vue";
import ButtonUi from "@components/ui/buttons/ButtonUi.vue";

const emit = defineEmits(["submit"]);

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

const form = reactive({
  name: "",
  email: "",
  department: "",
  message: "",
  cv: null,
});

const errors = reactive({
  name: "",
  email: "",
  department: "",
  message: "",
  cv: "",
});
const handleCvUpload = (event) => {
  const file = event.target.files[0];

  errors.cv = "";

  if (!file) {
    form.cv = null;
    return;
  }

  if (file.type !== "application/pdf") {
    errors.cv = "Le CV doit être au format PDF";
    form.cv = null;
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    errors.cv = "La taille du CV ne doit pas dépasser 5 Mo";
    form.cv = null;
    return;
  }

  form.cv = file;
};
const validate = () => {
  errors.name = "";
  errors.email = "";
  errors.department = "";
  errors.message = "";
  errors.cv = "";

  let valid = true;

  if (!form.name.trim()) {
    errors.name = "Le nom complet est obligatoire";
    valid = false;
  }
  if (!form.cv) {
    errors.cv = "Veuillez joindre votre CV";
    valid = false;
  }
  if (!form.email.trim()) {
    errors.email = "L'email est obligatoire";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Le format de l'email est invalide";
    valid = false;
  }

  if (!form.department) {
    errors.department = "Veuillez choisir un domaine";
    valid = false;
  }

  if (!form.message.trim()) {
    errors.message = "La motivation est obligatoire";
    valid = false;
  } else if (form.message.trim().length < 20) {
    errors.message = "La motivation doit contenir au moins 20 caractères";
    valid = false;
  }

  return valid;
};

const submitForm = () => {
  if (!validate()) return;

  emit("submit", {
    ...form,
  });
};
</script>

<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Demande de stage</h1>

      <p class="mt-2 text-sm text-gray-400">
        Remplissez le formulaire pour déposer votre demande.
      </p>
    </div>

    <form class="space-y-6" @submit.prevent="submitForm">
      <!-- NOM COMPLET -->
      <div>
        <label class="block text-sm font-medium"> Nom complet </label>

        <input
          v-model="form.name"
          type="text"
          placeholder="Votre nom complet"
          autocomplete="name"
          class="mt-2 block w-full border text-gray-500 rounded-md bg-white/5 px-3 py-2 outline outline-1 outline-white/10 transition focus:outline-2 focus:outline-indigo-500"
        />

        <p v-if="errors.name" class="mt-1 text-sm text-red-400">
          {{ errors.name }}
        </p>
      </div>

      <!-- EMAIL -->
      <div>
        <label class="block text-sm font-medium"> Email </label>

        <input
          v-model="form.email"
          type="email"
          placeholder="votre@email.com"
          autocomplete="email"
          class="mt-2 block w-full border text-gray-500 rounded-md bg-white/5 px-3 py-2 outline outline-1 outline-white/10 transition focus:outline-2 focus:outline-indigo-500"
        />

        <p v-if="errors.email" class="mt-1 text-sm text-red-400">
          {{ errors.email }}
        </p>
      </div>

      <!-- DOMAINE -->
      <div>
        <label class="block text-sm font-medium"> Domaine souhaité </label>

        <select
          v-model="form.department"
          class="mt-2 block w-full border text-gray-500 rounded-md bg-white/5 px-3 py-2 outline outline-1 outline-white/10 transition focus:outline-2 focus:outline-indigo-500"
        >
          <option value="" disabled class="bg-slate-900">
            Choisir un domaine
          </option>

          <option
            v-for="department in departments"
            :key="department"
            :value="department"
            class="bg-slate-900"
          >
            {{ department }}
          </option>
        </select>

        <p v-if="errors.department" class="mt-1 text-sm text-red-400">
          {{ errors.department }}
        </p>
      </div>

      <!-- MOTIVATION -->
      <div>
        <label class="block text-sm font-medium"> Motivation </label>

        <textarea
          v-model="form.message"
          rows="5"
          placeholder="Expliquez pourquoi vous souhaitez effectuer ce stage..."
          class="mt-2 border text-gray-500 block w-full resize-none rounded-md bg-white/5 px-3 py-2 outline outline-1 outline-white/10 transition focus:outline-2 focus:outline-indigo-500"
        />

        <p v-if="errors.message" class="mt-1 text-sm text-red-400">
          {{ errors.message }}
        </p>
      </div>
      <!-- CV UPLOAD -->
      <div>
        <label class="block text-sm font-medium"> CV (PDF) </label>
        <div class="border text-gray-500 rounded-md">
          <label
            class="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-white/20 bg-white/5 px-4 py-6 text-center transition hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mb-3 h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <span class="text-sm text-gray-300">
              Cliquez pour télécharger votre CV
            </span>

            <span v-if="form.cv" class="mt-2 text-sm text-green-400">
              {{ form.cv.name }}
            </span>

            <input
              type="file"
              accept="application/pdf"
              class="hidden"
              @change="handleCvUpload"
            />
          </label>
        </div>
        <p v-if="errors.cv" class="mt-1 text-sm text-red-400">
          {{ errors.cv }}
        </p>
      </div>
      <!-- BOUTON -->
      <ButtonUi title="Envoyer la demande" variant="primary" />
    </form>
  </div>
</template>
```
