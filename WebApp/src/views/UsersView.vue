<script setup lang="ts">
import { UserService } from "@/api/UserService";
import type { User } from "@/api/UserService";

const users: User[] = UserService.getAll();
</script>

<template>
  <div class="mt-4">
    <h1 class="text-2xl font-bold mb-4">Użytkownicy</h1>

    <div v-for="user in users" :key="user.id" class="card">
      <p class="font-semibold">{{ user.firstName }} {{ user.lastName }}</p>
      <p class="text-sm text-gray-400">Rola: {{ user.role }}</p>
    </div>
  </div>
</template>
