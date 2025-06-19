<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { ActiveProjectService } from "@/api/ActiveProjectService";
import ProjectStories from "@/components/ProjectStories.vue";

const route = useRoute();
const projectId = Number(route.params.id);

onMounted(() => {
  if (!isNaN(projectId)) {
    ActiveProjectService.setActiveProject(projectId);
  }
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Szczegóły projektu #{{ projectId }}</h1>
    <ProjectStories :project-id="projectId" />
  </div>
</template>
