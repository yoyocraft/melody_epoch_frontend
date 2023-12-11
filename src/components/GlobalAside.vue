<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const doSelect = (index: string) => {
  console.log(index);
  router.push({
    path: index,
  });
};

// todo 修改activeIdx
const activeIdx = ref(route.path ?? "/");
</script>

<template>
  <el-aside width="200px">
    <el-menu :default-active="activeIdx" @select="doSelect">
      <el-menu-item index="/">
        <template #title>
          <el-icon><house /></el-icon>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/band">
        <template #title>
          <el-icon><mic /></el-icon>
          <span>乐队</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/member">
        <template #title>
          <el-icon><user /></el-icon>
          <span>乐队成员</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/album">
        <template #title>
          <el-icon><files /></el-icon>
          <span>专辑</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/song">
        <template #title>
          <el-icon><video-play /></el-icon>
          <span>歌曲</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/concert">
        <template #title>
          <el-icon><ticket /></el-icon>
          <span>演唱会</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped></style>
