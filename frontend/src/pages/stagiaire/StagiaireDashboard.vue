<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 class="text-3xl font-bold">Dashboard Stagiaire</h1>

      <p class="mt-4 text-gray-600">Bienvenue dans votre espace stagiaire.</p>

      <div class="mt-8 grid grid-cols-3 gap-4">
        <div class="bg-blue-100 p-5 rounded-lg">
          <h2 class="font-bold">Ma demande</h2>

          <p>Suivre ma demande de stage</p>
        </div>

        <div class="bg-green-100 p-5 rounded-lg">
          <h2 class="font-bold">Profil</h2>

          <p>Mes informations</p>
        </div>

        <div class="bg-yellow-100 p-5 rounded-lg">
          <h2 class="font-bold">Documents</h2>

          <p>Mes fichiers</p>
        </div>
      </div>
    </div>
  </div>
</template>