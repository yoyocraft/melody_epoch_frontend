<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SongInfo } from "../../model/song/index";
import { listSongInfo } from "../../service/song/index";
import { useRouter } from "vue-router";

const router = useRouter();

const tableData = ref<SongInfo[]>([]);

/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  const res = await listSongInfo();
  tableData.value = res.map((info: SongInfo) => {
    return {
      ...info,
      albumName: info.albumName ?? " - "
    };
  });
});

const goBack = () => {
  router.back();
}

</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 歌曲信息 </span>
    </template>
  </el-page-header>
  <el-table :data="tableData" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="songId" label="歌曲序号" width="150" />
    <el-table-column prop="name" label="歌曲名称" width="150" />
    <el-table-column prop="bandName" label="乐队名称" width="150" />
    <el-table-column prop="author" label="作者" width="150" />
    <el-table-column prop="albumName" label="所属专辑名称" width="150" />
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
</template>

<style scoped></style>
