<script setup lang="ts">
import Sidebar from "@/layouts/Sidebar.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import Navbar from "@/layouts/Navbar.vue";
import { useUserStore } from "@/stores/userStore";

const store = useUserStore();
</script>


<template>
  <div class="min-h-screen bg-slate-50 flex">

    <!-- Sidebar -->
    <Sidebar />


    <!-- Main Content -->
    <main class="flex-1 p-8">

<Navbar />

      <!-- Statistics Cards -->
      <div class="grid md:grid-cols-3 gap-6">


        <BaseCard
          title="Students"
          value="120"
          color="text-indigo-600"
        />


        <BaseCard
          title="Internships"
          value="45"
          color="text-emerald-500"
        />


        <BaseCard
          title="Reports"
          value="32"
          color="text-purple-600"
        />


      </div>



      <!-- Recent Activities -->
      <div
        class="mt-8 bg-white rounded-2xl shadow-lg p-6"
      >

        <h2 class="text-xl font-bold text-slate-800 mb-4">
          Recent Activities
        </h2>


        <div class="space-y-3 text-slate-600">

          <p>
            ✅ New student added
          </p>

          <p>
            📄 Internship report uploaded
          </p>

          <p>
            🎓 Internship validated
          </p>

        </div>


      </div>


    </main>


  </div>
</template>