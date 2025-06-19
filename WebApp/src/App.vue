<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <Navbar />
    <main class="max-w-5xl mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>