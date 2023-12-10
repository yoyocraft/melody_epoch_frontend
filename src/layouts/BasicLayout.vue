<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div id="content">
    <router-view></router-view>
  </div>
</template>

<style scoped>
#content {
  text-align: center;
  background: url("../assets/background.png") 0% 0% /100% 100%;
}
</style>
