<script setup lang="ts">
import { ref } from 'vue';
import { SongAddReq } from "../../model/song/index";
import { addSong } from "../../service/song/index";
import { success } from '../../service/common';
import { useRouter } from 'vue-router';

const songAddParams = ref({} as SongAddReq)
const router = useRouter();

const onSubmit = async () => {
  const res = await addSong(songAddParams.value)
  if (res.data) {
    success("创建成功")
  }
  router.push({
    path: "/song",
    replace: true
  })
}
const onReset = () => {
  console.log("onReset");
  songAddParams.value = {} as SongAddReq;
}

const goBack = () => {
  router.back();
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 填写歌曲信息 </span>
    </template>
  </el-page-header>
  <el-form :model="songAddParams" label-width="120px" style="margin-top: 36px; text-align: center">
    <el-form-item label="歌曲名称">
      <el-input v-model="songAddParams.name" />
    </el-form-item>
    <el-form-item label="歌曲作者">
      <el-input v-model="songAddParams.author" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button type="info" @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
