<script setup lang="ts">
import { useRoute } from "vue-router";
import { StoryService } from "@/api/StoryService";
import { ref, onMounted } from "vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskKanban from "@/components/TaskKanban.vue";

const route = useRoute();
const storyId = Number(route.params.id);
const story = ref(StoryService.getAll().find(s => s.id === storyId) || null);
</script>

<template>
  <div class="mt-4">
    <h1 class="text-2xl font-bold mb-2">Historyjka: {{ story?.name }}</h1>
    <p class="mb-4">{{ story?.description }}</p>

    <TaskForm :story-id="storyId" @updated="() => {}" />
    <TaskKanban :story-id="storyId" />
  </div>
</template>
