<template>
  <v-app id="inspire">
    <Navigation />
    <v-main class="text-justify">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import Navigation from '@/components/NavigationSection.vue'
</script>
