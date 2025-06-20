<script setup lang="ts">
import { ref, onMounted } from "vue";
import { UserService } from "@/api/UserService";
import type { User } from "@/api/UserService";

const users = ref<User[]>([]);

onMounted(async () => {
  users.value = await UserService.fetchAll();
});
</script>

<template>
  <div class="max-w-3xl mx-auto mt-8 px-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
      👥 Użytkownicy
    </h1>

    <div class="grid gap-4">
      <div
        v-for="user in users"
        :key="user.id"
        class="p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 flex justify-between items-center"
      >
        <div>
          <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {{ user.firstName }} {{ user.lastName }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Rola: {{ user.role }}</p>
        </div>
        <div class="text-sm px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 capitalize">
          {{ user.role }}
        </div>
      </div>
    </div>
  </div>
</template>