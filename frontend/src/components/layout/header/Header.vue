<script setup>
import SwitchLang from "../../base/SwitchLang.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const alwaysBluePages = ["/interns", "/requests"];

const isBluePage = () => {
  return alwaysBluePages.includes(route.path);
};
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled || isBluePage() ? 'bg-[#200a83]' : 'bg-white shadow-lg',
    ]"
  >
    <div class="w-full px-6">
      <div class="flex h-16 items-center justify-between">
        <!-- Left -->
        <div class="flex items-center">
          <img
            src="../../../assets/logo.jpg"
            alt="Logo"
            class="h-14 w-auto object-contain rounded-full"
          />
        </div>

        <!-- Right -->
        <div class="flex items-center gap-4 mr-16">
          <!-- Notification -->
          <button
            type="button"
            :class="[
              'rounded-full p-2  transition',
              isScrolled || isBluePage() ? 'text-gray-300' : 'text-black',
            ]"
          >
            <span class="sr-only">Notifications</span>

            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>

          <!-- User Dropdown -->
          <el-dropdown placement="bottom-end">
            <button class="focus:outline-none">
              <img
                src="../../../assets/user.jpg"
                alt="User"
                class="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            </button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <a href="/profile">Profile</a>
                </el-dropdown-item>

                <el-dropdown-item divided>
                  <a href="/login">{{ $t("signOut") }}</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- Language Switch -->
        <SwitchLang :scrolled="isScrolled" :blue-page="isBluePage()" />
      </div>
    </div>
  </nav>
</template>
