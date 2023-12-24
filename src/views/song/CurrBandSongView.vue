<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ReleaseSongReq, Song } from "../../model/song/index";
import { currBandSongsByPage, releaseSong } from "../../service/song/index";
import { useRouter } from "vue-router";
import { Promotion } from "@element-plus/icons-vue";
import { success } from '../../utils/common';

const router = useRouter();

const tableData = ref<Song[]>([]);

/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  await loadDataByPage();
});


const goBack = () => {
  router.back();
}
const doReleaseSong = async (_: any, row: any) => {
  console.log(row.songId);
  const req = {} as ReleaseSongReq;
  req.songId = row.songId;
  const res = await releaseSong(req)
  if (res) {
    success("发布成功！")
    await loadDataByPage();
  }
}

const total = ref(0);
let currPage = 1
const onCurrChange = async (curr: number) => {
  currPage = curr
  await loadDataByPage();
}

const pageSize = 15;
const loadDataByPage = async () => {
  const res = await currBandSongsByPage(currPage, pageSize);
  total.value = res.total
  tableData.value = res.records.map((info: Song) => {
    return {
      ...info,
      albumName: info.albumName ?? " - "
    };
  });
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
  <el-pagination background :current-page="currPage" layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="onCurrChange" />
</template>


<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 16px;
}
</style>
../../utils/common
