<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Album } from "../../model/album/index";
import { currBandAllAlbums } from "../../service/album/index";
import { useRouter } from "vue-router";
import { Promotion } from "@element-plus/icons-vue";
import { formatDateTime } from "../../utils";

const router = useRouter();
const doGetAlbumDetail = (_: any, row: any) => {
  router.push({
    path: "/album/info",
    query: {
      id: row.albumId
    }
  });
};

const doReleaseAlbum = async (_: any, row: any) => {
  console.log(row.albumId);
  // TODO 发布专辑信息
}

const tableData = ref<Album[]>([]);

const loadData = async () => {
  const res = await currBandAllAlbums();
  console.log("@@@ ", res);

  tableData.value = res.map((info: Album) => {
    return {
      ...info,
      avgScore: info.avgScore ?? 0.0,
      releaseTime: info.releaseTime ? formatDateTime(info.releaseTime) : " - ",
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

</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 专辑信息 </span>
    </template>
  </el-page-header>
  <el-table :data="tableData" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="albumId" label="专辑序号" width="150" />
    <el-table-column prop="name" label="专辑名称" width="150" />
    <el-table-column prop="company" label="发行公司" width="150" />
    <el-table-column prop="releaseTime" label="发行时间" width="150" />
    <el-table-column prop="bandName" label="乐队名称" width="150" />
    <el-table-column prop="avgScore" label="专辑均分" width="150" />
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">

        <el-button disabled :icon="Promotion" v-if="scope.row.isRelease === 1" link type="info">已发布</el-button>
        <el-button :icon="Promotion" v-else link type="success"
          @click="doReleaseAlbum(scope.$index, scope.row)">发布</el-button>
        <el-button link type="primary" @click="doGetAlbumDetail(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
</template>

<style scoped></style>
