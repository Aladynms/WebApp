<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { UserService } from "@/api/UserService";
import { ActiveProjectService } from "@/api/ActiveProjectService";
import { ThemeService } from "@/api/ThemeService";

const router = useRouter();
const user = computed(() => UserService.getCurrentUser());
const theme = ref(ThemeService.get());

const goToProjects = () => {
  ActiveProjectService.clear();
  router.push("/");
};

const goToUsers = () => {
  router.push("/users");
};

const setTheme = (value: "light" | "dark" | "auto") => {
  theme.value = value;
  ThemeService.set(value);
};
</script>

<template>
  <nav class="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
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

      <!-- Użytkownik -->
      <span class="hidden sm:inline-block font-medium">
        👤 {{ user.firstName }} {{ user.lastName }}
      </span>
    </div>
  </nav>
</template>
