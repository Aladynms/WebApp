<script setup lang="ts">
import { UserService } from "@/api/UserService";
import { ActiveProjectService } from "@/api/ActiveProjectService";
import { useRouter } from "vue-router";
import { computed } from "vue";

const user = computed(() => UserService.getCurrentUser());
const router = useRouter();

const goToProjects = () => {
  ActiveProjectService.clear();
  router.push("/");
};

const goToUsers = () => {
  router.push("/users");
};
</script>


<template>
  <nav class="flex justify-between items-center px-6 py-4">
    <div class="flex gap-4">
      <button @click="goToProjects">📁 Projekty</button>
      <button @click="goToUsers">👥 Użytkownicy</button>
    </div>
    <div class="text-sm text-gray-300">
      👤 {{ user.firstName }} {{ user.lastName }} ({{ user.role }})
    </div>
  </nav>
</template>