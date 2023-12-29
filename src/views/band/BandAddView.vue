<script setup lang="ts">
import { ref } from 'vue'
import { BandAddReq } from "../../model/band/index"
import { addBand } from "../../service/band/index"
import { success } from '../../utils/common';
import { useRouter } from 'vue-router';

const bandAddParams = ref({} as BandAddReq)
const router = useRouter();

const onSubmit = async () => {
  const res = await addBand(bandAddParams.value);
  if (res.data) {
    success("创建成功")
  }
  router.push({
    path: "/band/curr",
    replace: true
  })
}
const onReset = () => {
  bandAddParams.value = {} as BandAddReq;
}
</script>

<template>
  <el-divider style="margin-top: 36px; margin-bottom: 36px">
    <span style="font-size: 30px; color: rgb(16, 141, 219)">填写乐队信息</span>
  </el-divider>
  <el-form :model="bandAddParams" label-width="120px" style="margin-top: 36px; text-align: center">
    <el-form-item label="乐队名称">
      <el-input v-model="bandAddParams.bandName" />
    </el-form-item>
    <el-form-item label="乐队简介">
      <el-input v-model="bandAddParams.profile" maxlength="250" show-word-limit :autosize="{ minRows: 2, maxRows: 6 }"
        type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button type="info" @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>

