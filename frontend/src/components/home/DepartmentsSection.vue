<script setup lang="ts">
import { useRouter } from "vue-router";
import { useScrollReveal } from "@/composables/UseScrollReveal";

const router = useRouter();

interface Department {
  slug: string;
  icon: string;
  name: string;
  description: string;
  openPositions: number;
}

const departments: Department[] = [
  { slug: "developpement-web", icon: "code", name: "Développement Web", description: "Applications web, front-end, back-end et intégration.", openPositions: 6 },
  { slug: "cybersecurite", icon: "shield-lock", name: "Cybersécurité", description: "Audit de sécurité, pentest et protection des données.", openPositions: 4 },
  { slug: "reseaux-infrastructure", icon: "server", name: "Réseaux & Infrastructure", description: "Hébergement, serveurs et administration système.", openPositions: 3 },
  { slug: "marketing-digital", icon: "megaphone", name: "Marketing Digital", description: "Communication, SEO et gestion des réseaux sociaux.", openPositions: 2 },
  { slug: "ressources-humaines", icon: "briefcase", name: "Ressources Humaines", description: "Recrutement, suivi administratif et formation.", openPositions: 2 },
  { slug: "support-client", icon: "headset", name: "Support Client", description: "Assistance technique et relation clientèle.", openPositions: 3 },
];

const { sectionRef, visibleItems: visibleCards } = useScrollReveal(departments.length);

function goToInternship(dept: Department) {
  router.push({
    path: "/demande-stage",
    query: { departement: dept.slug, label: dept.name },
  });
}

const icons: Record<string, string> = {
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  "shield-lock": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M9.5 12.5 11 14l3.5-3.5"/>',
  server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3Z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  headset: '<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
};
</script>

<template>
  <section id="departements" ref="sectionRef" class="relative py-24 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <span class="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3 px-4 py-1 bg-blue-50 rounded-full">
          Départements
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Choisissez votre domaine</h2>
        <p class="text-gray-500 max-w-xl mx-auto">
          AXPROO propose des stages dans plusieurs départements. Sélectionnez celui
          qui vous correspond pour démarrer votre candidature.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(dept, i) in departments"
          :key="dept.slug"
          class="group relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm transition-all duration-500 ease-out hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-1.5 overflow-hidden"
          :class="visibleCards[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-5">
              <div class="w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" v-html="icons[dept.icon]"></svg>
              </div>
              <span class="text-xs font-semibold text-blue-700 bg-blue-50 group-hover:bg-white/20 group-hover:text-white px-3 py-1 rounded-full transition-all duration-500">
                {{ dept.openPositions }} postes
              </span>
            </div>

            <h3 class="font-bold text-lg text-gray-900 group-hover:text-white mb-2 transition-colors duration-500">
              {{ dept.name }}
            </h3>
            <p class="text-gray-500 group-hover:text-blue-100 text-sm leading-relaxed transition-colors duration-500 mb-5">
              {{ dept.description }}
            </p>

            <!-- Seul CE bouton déclenche la navigation, pas toute la carte -->
            <button
              @click="goToInternship(dept)"
              class="w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-white bg-blue-50 group-hover:bg-white/20 rounded-xl py-2.5 transition-all duration-500"
            >
              Postuler dans ce département
              <svg class="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>