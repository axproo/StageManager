<template>
  <div class="bg-gray-50">
    <!-- HERO -->
    <section
      class="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#200a83] via-[#15108a] to-[#091586] opacity-90 blur-3xl"
      />

      <!-- Content -->
      <div class="relative z-10 text-center text-white px-6">
        <h1 class="text-6xl font-bold mb-6">
          {{ $t("internShipManagementSystem") }}
        </h1>

        <p class="max-w-3xl text-xl text-blue-100 leading-8">
          {{ $t("welcomeMessage") }}
        </p>
        <div
          class="max-w-4xl mx-auto text-center px-6 w-full bg-neutral-primary-soft p-6 border border-blue-300 rounded-xl shadow-lg mt-6"
        >
          <transition name="fade" mode="out-in">
            <p :key="currentQuote" class="text-xl italic leading-10">
              "{{ $t(`quotes.${currentQuote}.text`) }}"
            </p>
          </transition>
        </div>
        <button
          class="mt-10 bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          @click="scrollToOverview"
        >
          {{ $t("exploreDashboard") }}
        </button>

        <div class="mt-16 animate-bounce text-4xl" @click="scrollToOverview">
          ↓
        </div>
      </div>
    </section>

    <!-- OVERVIEW -->
    <section ref="overview" class="py-20 px-6">
      <h2 class="text-4xl font-bold text-center mb-4 text-slate-800">
        {{ $t("dashboardOverView") }}
      </h2>

      <p class="text-center text-gray-500 mb-14">
        {{ $t("quickOverview") }}
      </p>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
      >
        <div
          v-for="card in cards"
          :key="card.key"
          class="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-xl transition"
        >
          <div class="text-5xl mb-4">
            {{ card.icon }}
          </div>

          <h3 class="text-4xl font-bold text-blue-700">
            {{ card.value }}
          </h3>

          <p class="mt-2 text-gray-500">
            {{ $t(card.title) }}
          </p>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-14">
          {{ $t("whatWeOffer") }}
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="feature in features"
            :key="feature.key"
            class="bg-gray-50 rounded-xl p-8 shadow hover:shadow-lg transition"
            @click="navigateTo(feature.path)"
          >
            <div class="text-4xl mb-4">
              {{ feature.icon }}
            </div>

            <h3 class="font-bold text-xl mb-3">
              {{ $t(`features.${feature.key}.title`) }}
            </h3>

            <p class="text-gray-500">
              {{ $t(`features.${feature.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const overview = ref(null);
const currentQuote = ref(0);

let interval;

onMounted(() => {
  interval = setInterval(() => {
    currentQuote.value++;

    if (currentQuote.value >= 2) {
      currentQuote.value = 0;
    }
  }, 5000); // change toutes les 5 secondes
});
const navigateTo = (path) => {
  router.push(path);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
onUnmounted(() => {
  clearInterval(interval);
});
const scrollToOverview = () => {
  overview.value.scrollIntoView({
    behavior: "smooth",
  });
};

const cards = [
  {
    icon: "👨‍🎓",
    value: 250,
    title: "interns",
  },
  {
    icon: "🏢",
    value: 12,
    title: "departements",
  },
  {
    icon: "📄",
    value: 56,
    title: "interships",
  },
  {
    icon: "📈",
    value: "92%",
    title: "successRate",
  },
];

const features = [
  {
    icon: "👨‍🎓",
    key: "manageInterns",
    path: "/interns",
  },
  {
    icon: "🏢",
    key: "departments",
    path: "/departments",
  },
  {
    icon: "📊",
    key: "trackProgress",
    path: "/progress",
  },
  {
    icon: "📑",
    key: "generateReports",
    path: "/reports",
  },
];
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 1s ease,
    transform 1s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
