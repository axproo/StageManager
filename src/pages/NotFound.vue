<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-6"
  >
    <div
      class="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md"
    >
      <div
        class="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center text-5xl"
      >
        🚫
      </div>

      <h1 class="text-6xl font-bold text-gray-800 mt-6">
        404
      </h1>

      <p class="text-xl font-semibold text-gray-700 mt-3">
        Page Not Found
      </p>

      <p class="text-gray-500 mt-2">
        The page you are looking for doesn't exist.
      </p>

      <router-link
        to="/login"
        class="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition"
      >
        Back to Login
      </router-link>
    </div>
  </div>
</template>