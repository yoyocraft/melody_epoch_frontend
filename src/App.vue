<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
import UserLayout from "./layouts/UserLayout.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div id="app">
    <template
      v-if="
        route.path.startsWith('/login') || route.path.startsWith('/register')
      "
    >
      <UserLayout />
    </template>
    <template v-else> <BasicLayout /> </template>
  </div>
</template>

<style scoped></style>
