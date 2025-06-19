<script setup lang="ts">
import { useRoute } from "vue-router";
import { StoryService } from "@/api/StoryService";
import { ref } from "vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskKanban from "@/components/TaskKanban.vue";

const route = useRoute();
const storyId = Number(route.params.id);
const story = ref(StoryService.getAll().find(s => s.id === storyId) || null);

// Przeładuj TaskKanban przez zmianę klucza
const kanbanKey = ref(0);
const refreshKanban = () => kanbanKey.value++;
</script>

<template>
  <div class="mt-4">
    <h1 class="text-2xl font-bold mb-2">Historyjka: {{ story?.name }}</h1>
    <p class="mb-4">{{ story?.description }}</p>

    <TaskForm :story-id="storyId" @updated="refreshKanban" />
    <TaskKanban :story-id="storyId" :key="kanbanKey" />
  </div>
</template>
