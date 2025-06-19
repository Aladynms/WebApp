<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "@/api/AuthService";

const router = useRouter();
const login = ref("");
const password = ref("");
const error = ref("");

const submit = async () => {
  try {
    await AuthService.login(login.value, password.value);
    router.push("/");
  } catch (e: any) {
    error.value = "Niepoprawne dane logowania.";
  }
};
</script>

<template>
  <div class="container mt-6 max-w-md mx-auto card">
    <h1 class="text-2xl font-bold mb-4">Logowanie</h1>
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="login" placeholder="Login" required />
      <input v-model="password" type="password" placeholder="Hasło" required />
      <button>Zaloguj się</button>
      <p v-if="error" class="text-red-400">{{ error }}</p>
    </form>
  </div>
</template>
