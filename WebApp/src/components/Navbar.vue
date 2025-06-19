<script setup lang="ts">
import { UserService } from "@/api/UserService";
import { ActiveProjectService } from "@/api/ActiveProjectService";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = computed(() => UserService.getCurrentUser());

const goToProjects = () => {
  ActiveProjectService.clear(); // ⬅️ Usuwamy aktywny projekt z localStorage
  router.push("/");             // ⬅️ Przekierowanie na stronę główną
};
</script>

<template>
  <nav class="flex justify-between items-center px-6 py-4">
    <button @click="goToProjects">📁 Projekty</button>
    <div class="text-sm text-gray-300">
      👤 {{ user.firstName }} {{ user.lastName }}
    </div>
  </nav>
</template>