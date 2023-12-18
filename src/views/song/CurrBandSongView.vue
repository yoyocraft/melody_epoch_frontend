<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Song } from "../../model/song/index";
import { currBandSongs } from "../../service/song/index";
import { useRouter } from "vue-router";
import { Promotion } from "@element-plus/icons-vue";

const router = useRouter();

const tableData = ref<Song[]>([]);

const loadData = async () => {
  const res = await currBandSongs();
  tableData.value = res.map((info: Song) => {
    return {
      ...info,
      albumName: info.albumName ?? " - "
    };
  });
}

/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  await loadData();
});


const goBack = () => {
  router.back();
}
const doReleaseSong = async (_: any, row: any) => {
  console.log(row.songId);

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
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button disabled v-if="scope.row.isRelease === 1" :icon="Promotion" link type="success">已发布</el-button>
        <el-button :icon="Promotion" v-else link type="success"
          @click="doReleaseSong(scope.$index, scope.row)">发布</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
</template>

<style scoped></style>
