<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div id="userLayout">
    <router-view></router-view>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: url("../assets/background.png") 0% 0% /100% 100%;
}
</style>
