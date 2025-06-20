<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { currentUser, UserService } from "@/api/UserService";
import { ActiveProjectService } from "@/api/ActiveProjectService";
import { ThemeService, type Theme  } from "@/api/ThemeService";

const router = useRouter();
const theme = ref<Theme>("auto");

const goToProjects = async () => {
  await ActiveProjectService.clear();
  router.push("/");
};

const goToUsers = () => {
  router.push("/users");
};

const logout = () => {
  UserService.logout();
  router.push("/login");
};

const setTheme = (value: "light" | "dark" | "auto") => {
  theme.value = value;
  ThemeService.set(value);
};

onMounted(async () => {
  theme.value = await ThemeService.get();

  if (!currentUser.value) {
    await UserService.fetchCurrentUser();
  }
});
</script>

<template>
  <nav
    v-if="currentUser"
    class="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md"
  >
    <!-- Lewa sekcja -->
    <div class="flex gap-2">
      <button
        @click="goToProjects"
        class="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200 transition"
      >
        📁 Projekty
      </button>
      <button
        @click="goToUsers"
        class="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200 transition"
      >
        👥 Użytkownicy
      </button>
    </div>

    <!-- Prawa sekcja -->
    <div class="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
      <!-- Motyw -->
      <select
        v-model="theme"
        @change="setTheme(theme)"
        class="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition"
      >
        <option value="auto">🌗 Auto</option>
        <option value="light">☀️ Jasny</option>
        <option value="dark">🌙 Ciemny</option>
      </select>

      <!-- Dane użytkownika -->
      <span class="hidden sm:inline-block font-medium">
        👤 {{ currentUser.firstName }} {{ currentUser.lastName }}
      </span>

      <!-- Wyloguj -->
      <button
        @click="logout"
        class="px-3 py-1.5 rounded-md bg-red-100 hover:bg-red-200 dark:bg-red-700 dark:hover:bg-red-600 text-sm font-medium text-red-800 dark:text-white transition"
      >
        🚪 Wyloguj
      </button>
    </div>
  </nav>
</template>
