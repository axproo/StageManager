<template>
  <div
    id="accueil"
    class="min-h-screen m-0 p-0 bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-700 text-white"
  >
    <!-- Section principale -->
    <section class="h-screen flex flex-col items-center justify-center text-center px-6">
      <!-- Logo -->
      <div
        class="relative bg-white/90 p-3 rounded-full shadow-2xl border-4 border-cyan-300 hover:scale-105 transition duration-500"
      >
        <div class="absolute inset-0 bg-cyan-400/20 rounded-full blur-3xl"></div>

        <img
          src="/axproo-logo.jpeg"
          alt="AXPROO Logo"
          class="relative w-40 h-40 object-contain rounded-full"
        />
      </div>

      <!-- Titre -->
      <h1
        class="mt-6 text-3xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-200"
      >
        Plateforme de Gestion des Stagiaires
      </h1>

      <!-- Description -->
      <p class="mt-6 text-lg md:text-2xl text-slate-200 max-w-4xl leading-8">
        Une solution moderne permettant de gérer efficacement les stagiaires, les départements, les
        présences, les tâches, les rapports et les statistiques.
      </p>

      <!-- Bouton connexion -->
      <RouterLink
        to="/login"
        class="mt-10 px-12 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
      >
        🔐 Se connecter
      </RouterLink>
    </section>

    <!-- Fonctionnalités principales -->
    <section id="fonctionnalites" class="py-16 scroll-mt-24">
      <div class="text-center max-w-3xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-cyan-300">Fonctionnalités principales</h2>

        <p class="mt-4 text-gray-200 text-lg">
          Une plateforme complète pour simplifier la gestion des stages.
        </p>
      </div>

      <div
        class="mt-12 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <div
          class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:scale-105 hover:bg-white/20 transition duration-300"
        >
          <div class="text-5xl mb-4">👨‍🎓</div>
          <h3 class="text-2xl font-bold text-cyan-300">Gestion des stagiaires</h3>
          <p class="mt-4 text-gray-200">
            Gérez facilement les informations des stagiaires, leurs profils et leurs affectations.
          </p>
        </div>

        <div
          class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:scale-105 hover:bg-white/20 transition duration-300"
        >
          <div class="text-5xl mb-4">✅</div>
          <h3 class="text-2xl font-bold text-cyan-300">Suivi des activités</h3>
          <p class="mt-4 text-gray-200">
            Gérez les présences, les tâches quotidiennes et la progression des stagiaires.
          </p>
        </div>

        <div
          class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:scale-105 hover:bg-white/20 transition duration-300"
        >
          <div class="text-5xl mb-4">📊</div>
          <h3 class="text-2xl font-bold text-cyan-300">Rapports & Statistiques</h3>
          <p class="mt-4 text-gray-200">
            Consultez les statistiques et générez des rapports détaillés sur les performances.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="bg-slate-900/70 backdrop-blur text-center py-6 mt-8 text-gray-300 border-t border-cyan-500/20"
    >
      <p>© 2026 AXPROO - Plateforme de gestion des stagiaires</p>
    </footer>
  </div>
</template>

<script setup></script>

<style scoped></style>
