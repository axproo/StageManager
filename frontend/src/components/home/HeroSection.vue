<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";

const router = useRouter();
const isLoaded = ref(false);

const stats = [
  { value: "500+", label: "Stagiaires accompagnés" },
  { value: "50+", label: "Entreprises partenaires" },
  { value: "12", label: "Ans d'expertise cybersécurité" },
  { value: "98%", label: "Taux de satisfaction" },
];

// Génère des positions pseudo-aléatoires mais stables pour les étoiles
const stars = computed(() =>
  Array.from({ length: 70 }, (_, i) => {
    const seed = i + 1;
    return {
      top: `${(seed * 37) % 100}%`,
      left: `${(seed * 53) % 100}%`,
      size: 1 + (seed % 3) * 0.6,
      delay: `${(seed % 10) * 0.4}s`,
      duration: `${2.5 + (seed % 4)}s`,
    };
  })
);

onMounted(() => {
  setTimeout(() => (isLoaded.value = true), 100);
});

function goToInternship() {
  router.push("/demande-stage");
}

function goToLogin() {
  router.push("/login");
}
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden pt-24 night-hero">
    <!-- Ciel étoilé -->
    <div class="stars-layer" aria-hidden="true">
      <span
        v-for="(star, i) in stars"
        :key="i"
        class="star"
        :style="{
          top: star.top,
          left: star.left,
          width: `${star.size}px`,
          height: `${star.size}px`,
          animationDelay: star.delay,
          animationDuration: star.duration,
        }"
      ></span>
      <span class="shoot-star shoot-1"></span>
      <span class="shoot-star shoot-2"></span>
    </div>

    <!-- Glow décoratif -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl opacity-20 -z-0"></div>

    <div class="max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
      <div
        class="transition-all duration-700 ease-out"
        :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <span
          class="inline-flex items-center gap-2 text-blue-200 text-sm font-semibold tracking-wide uppercase mb-6 px-4 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm"
        >
          <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          AXPROO · Sécurité & données depuis 2013
        </span>

        <h1 class="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Gérez vos
          <span class="relative inline-block text-blue-400">
            stagiaires
            <svg
              class="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 6C40 2 160 2 198 6"
                stroke="#60a5fa"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
          </span>
          en toute sécurité
        </h1>

        <p class="text-lg text-blue-100/80 mb-10 max-w-lg mx-auto leading-relaxed">
          La plateforme AXPROO centralise la demande, la validation et le suivi des stages,
          avec le même niveau d'exigence en protection des données que nos solutions
          d'hébergement et de cybersécurité.
        </p>

        <div class="flex flex-wrap justify-center gap-4 mb-16">
          <button
            @click="goToInternship"
            class="group bg-blue-600 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center gap-2"
          >
            Déposer une demande
            <svg
              class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
            >
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <button
            @click="goToLogin"
            class="border-2 border-white/25 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:border-blue-400 hover:bg-white/5 hover:-translate-y-0.5"
          >
            Espace connexion
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="transition-all duration-700 ease-out"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: `${i * 100 + 300}ms` }"
          >
            <div class="text-2xl font-bold text-blue-400">{{ stat.value }}</div>
            <div class="text-xs text-blue-100/60 leading-snug">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.night-hero {
  background: linear-gradient(160deg, #000814 0%, #001d3d 40%, #003566 75%, #1d4ed8 100%);
}

.stars-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.star {
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
  animation-name: twinkle;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.15; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.3); }
}

.shoot-star {
  position: absolute;
  width: 90px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.9), transparent);
  border-radius: 2px;
  opacity: 0;
  animation: shoot 6s linear infinite;
}

.shoot-1 {
  top: 15%;
  left: 5%;
  animation-delay: 1s;
}

.shoot-2 {
  top: 45%;
  left: 55%;
  animation-delay: 4s;
}

@keyframes shoot {
  0% { transform: translate(0, 0) rotate(20deg); opacity: 0; }
  4% { opacity: 1; }
  15% { transform: translate(220px, 90px) rotate(20deg); opacity: 0; }
  100% { opacity: 0; }
}
</style>