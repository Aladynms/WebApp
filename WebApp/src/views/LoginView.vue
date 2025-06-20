<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "@/api/AuthService";
import { UserService } from "@/api/UserService";

const router = useRouter();
const login = ref("");
const password = ref("");
const error = ref("");

const submit = async () => {
  try {
    await AuthService.login(login.value, password.value);
    await UserService.fetchCurrentUser();
    router.push("/");
  } catch (e: any) {
    error.value = "Niepoprawne dane logowania.";
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        🔐 Logowanie
      </h1>

      <form @submit.prevent="submit" class="space-y-4">
        <input
          v-model="login"
          type="text"
          placeholder="Login"
          required
          class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Hasło"
          required
          class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
        >
          Zaloguj się
        </button>

        <p v-if="error" class="text-red-400 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

