<script lang="ts">
  import { defineComponent, reactive, onMounted } from "vue";
  import { ProjectService } from "../api/ProjectService";
  import type { Project } from "../api/ProjectService";
  
  export default defineComponent({
    name: "ManagMe",
    setup() {
      const projects = reactive<Project[]>([]);
      const form = reactive<Project>({ id: 0, name: "", description: "" });
  
      const loadProjects = () => {
        const data = ProjectService.getAll();
        projects.splice(0, projects.length, ...data);
      };
  
      const saveProject = () => {
        ProjectService.save({ ...form });
        resetForm();
        loadProjects();
      };
  
      const editProject = (project: Project) => {
        Object.assign(form, project);
      };
  
      const deleteProject = (id: number) => {
        ProjectService.delete(id);
        loadProjects();
      };
  
      const resetForm = () => {
        form.id = 0;
        form.name = "";
        form.description = "";
      };
  
      onMounted(loadProjects);
  
      return {
        projects,
        form,
        saveProject,
        editProject,
        deleteProject,
        resetForm,
      };
    },
  });
</script>

<template>
    <div class="p-6 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Zarządzanie projektami</h1>
  
      <!-- Formularz dodawania/edycji -->
      <form @submit.prevent="saveProject" class="mb-6 p-4 border rounded">
        <input v-model="form.name" type="text" placeholder="Nazwa projektu" class="w-full p-2 border rounded mb-2" required />
        <textarea v-model="form.description" placeholder="Opis projektu" class="w-full p-2 border rounded mb-2" required></textarea>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          {{ form.id ? "Zapisz zmiany" : "Dodaj projekt" }}
        </button>
        <button v-if="form.id" @click="resetForm" type="button" class="ml-2 bg-gray-400 text-white px-4 py-2 rounded">
          Anuluj
        </button>
      </form>
  
      <!-- Lista projektów -->
      <ul class="space-y-4">
        <li v-for="project in projects" :key="project.id" class="p-4 border rounded flex justify-between">
          <div>
            <h3 class="text-lg font-semibold">{{ project.name }}</h3>
            <p class="text-gray-600">{{ project.description }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="editProject(project)" class="bg-yellow-500 text-white px-3 py-1 rounded">Edytuj</button>
            <button @click="deleteProject(project.id)" class="bg-red-500 text-white px-3 py-1 rounded">Usuń</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  
  