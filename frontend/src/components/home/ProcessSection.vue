<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Step {
  number: string;
  icon: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: "file-text",
    title: "Déposer une demande",
    description:
      "Le stagiaire remplit le formulaire sécurisé avec ses informations personnelles et académiques.",
  },
  {
    number: "02",
    icon: "search",
    title: "Analyse du dossier",
    description:
      "L'administrateur examine la candidature et vérifie sa conformité avec les critères requis.",
  },
  {
    number: "03",
    icon: "check-circle",
    title: "Validation",
    description:
      "La demande est acceptée ou refusée, avec notification automatique au candidat.",
  },
  {
    number: "04",
    icon: "trending-up",
    title: "Suivi du stage",
    description:
      "Le stagiaire suit l'évolution de son parcours depuis son espace personnel sécurisé.",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const visibleSteps = ref<boolean[]>(steps.map(() => false));
const lineProgress = ref(0);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => {
              visibleSteps.value[i] = true;
              lineProgress.value = ((i + 1) / steps.length) * 100;
            }, i * 200);
          });
          observer?.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => observer?.disconnect());

const icons: Record<string, string> = {
  "file-text":
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  search:
    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "check-circle":
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  "trending-up":
    '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
};
</script>

<template>
  <section ref="sectionRef" class="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
    <!-- Décor de fond -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>

    <!-- Header -->
    <div class="text-center mb-20">
      <span
        class="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3 px-4 py-1 bg-blue-50 rounded-full"
      >
        Processus AXPROO
      </span>
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
      <p class="text-gray-500 max-w-xl mx-auto">
        Un parcours simple, sécurisé et transparent de la candidature au suivi du stage.
      </p>
    </div>

    <!-- Timeline -->
    <div class="relative">
      <!-- Ligne de fond -->
      <div
        class="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gray-200"
      ></div>
      <!-- Ligne de progression animée -->
      <div
        class="hidden md:block absolute top-10 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out"
        :style="{ width: lineProgress + '%' }"
      ></div>

      <div class="grid md:grid-cols-4 gap-8 relative">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          class="group relative transition-all duration-700 ease-out"
          :class="visibleSteps[i]
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'"
        >
          <!-- Cercle numéro -->
          <div class="relative z-10 flex justify-center mb-6">
            <div
              class="w-20 h-20 rounded-full bg-white border-2 border-blue-100 shadow-sm flex items-center justify-center transition-all duration-500 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-100 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-7 h-7 text-blue-600 transition-transform duration-500 group-hover:scale-110"
                v-html="icons[step.icon]"
              ></svg>
            </div>
            <span
              class="absolute -top-2 -right-1 md:right-6 bg-blue-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md"
            >
              {{ step.number }}
            </span>
          </div>

          <!-- Card contenu -->
          <div
            class="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-50 group-hover:-translate-y-1 group-hover:border-blue-200"
          >
            <h3 class="font-bold text-lg mb-2 text-gray-900">
              {{ step.title }}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>