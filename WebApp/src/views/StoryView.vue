<script setup lang="ts">
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { StoryService } from "@/api/StoryService";
import { ref } from "vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskKanban from "@/components/TaskKanban.vue";
import { ActiveProjectService } from "@/api/ActiveProjectService";

const route = useRoute();
const router = useRouter();
const storyId = Number(route.params.id);
const story = ref(StoryService.getAll().find(s => s.id === storyId) || null);

// Przeładuj TaskKanban przez zmianę klucza
const kanbanKey = ref(0);
const refreshKanban = () => kanbanKey.value++;

const goBack = () => {
  const projectId = ActiveProjectService.getActiveProjectId();
  if (projectId) {
    router.push(`/project/${projectId}`);
  } else {
    router.push("/"); // fallback gdyby ID było nullem
  }
};
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 space-y-6">
    <!-- Przycisk powrotu -->
    <button
      @click="goBack"
      class="text-sm px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      ⬅ Powrót do projektu
    </button>

    <div>
      <h1 class="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        📘 Historyjka: {{ story?.name }}
      </h1>
      <p class="text-gray-600 dark:text-gray-300">{{ story?.description }}</p>
    </div>

    <TaskForm :story-id="storyId" @updated="refreshKanban" />
    <TaskKanban :story-id="storyId" :key="kanbanKey" />
  </div>
</template>