<script lang="ts" setup>
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const doUserInfo = () => {};

const logout = () => {
  console.log("logout");
};
</script>

<template>
  <el-menu
    default-active="0"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <h1>Melody-Epoch</h1>
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-sub-menu index="1">
      <template #title
        ><el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      /></template>
      <el-menu-item index="2-1" @click="doUserInfo">个人信息</el-menu-item>
      <el-menu-item index="2-2" @click="logout">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
