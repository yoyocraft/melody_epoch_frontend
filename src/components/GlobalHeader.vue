<script lang="ts" setup>
import { useRouter } from "vue-router";
import { userLogout } from "../service/user/index"
import { success } from "../utils/common";
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const doUserInfo = () => {
  router.push({
    path: "/user/info"
  })
};
const router = useRouter();

const logout = async () => {
  const res = await userLogout();
  console.log(res);

  if (res) {
    router.push({
      path: "/login",
      replace: true
    })
  }
  success("登出成功");
  console.log("logout");
};

</script>

<template>
  <el-menu default-active="0" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="0">
      <h1 class="header">Melody-Epoch</h1>
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-sub-menu index="1">
      <template #title><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /></template>
      <el-menu-item @click="doUserInfo">个人信息</el-menu-item>
      <el-menu-item @click="logout">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}

.header {
  font-family: "Comic Sans MS";
  /* font-family: "Kristen ITC"; */
  color: #BB5571;
}
</style>
../utils/common
