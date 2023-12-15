<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AlbumBriefInfo } from "../../model/album/index";
import { listAlbumBriefInfo } from "../../service/album/index";
import { useRouter } from "vue-router";

const router = useRouter();
const doGetAlbumDetail = (_: any, row: any) => {
  router.push({
    path: "/album/info",
    query: {
      id: row.albumId
    }
  });
};

const tableData = ref<AlbumBriefInfo[]>([]);

/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  const res = await listAlbumBriefInfo();
  tableData.value = res.map((info: AlbumBriefInfo) => {
    return {
      ...info,
      avgScore: info.avgScore ?? 0.0
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
      <span class="text-large font-600 mr-3"> 专辑信息 </span>
    </template>
  </el-page-header>
  <el-table :data="tableData" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="albumId" label="专辑序号" width="150" />
    <el-table-column prop="name" label="专辑名称" width="150" />
    <el-table-column prop="company" label="发行公司" width="150" />
    <el-table-column prop="bandName" label="乐队名称" width="150" />
    <el-table-column prop="avgScore" label="专辑均分" width="150" />
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="doGetAlbumDetail(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
</template>

<style scoped></style>
