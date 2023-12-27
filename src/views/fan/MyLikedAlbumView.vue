<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AlbumInfo } from "../../model/album/index";
import { LikeReq } from "../../model/fan/index";
import { listMyLikedAlbumByPage } from "../../service/fan/index";
import { LIKE_TYPE_MAP, formatDate } from "../../utils/index"
import { unlike } from "../../service/fan/index";
import { useRouter } from "vue-router";
import { success } from '../../utils/common';

const router = useRouter();
const doGetAlbumDetail = (_: any, row: any) => {
  router.push({
    path: "/album/info",
    query: {
      id: row.albumId
    }
  });
};

const doNotLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.albumId;
  req.type = LIKE_TYPE_MAP.LIKE_ALBUM;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadAlbumByPage();
  }
}

const pageSize = 15;
const albumTotal = ref(0);
let albumCurrPage = 1
const onAlbumCurrChange = async (curr: number) => {
  albumCurrPage = curr
  await loadAlbumByPage();
}
const bandAlbumInfo = ref<AlbumInfo[]>([])
const loadAlbumByPage = async () => {
  const res = await listMyLikedAlbumByPage(albumCurrPage, pageSize);

  albumTotal.value = res.total
  bandAlbumInfo.value = res.records.map((info: AlbumInfo) => {
    return {
      ...info,
      releaseTime: formatDate(info.releaseTime),
      avgScore: info.avgScore ?? 0.0
    };
  });
}
/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  await loadAlbumByPage();
});

const goBack = () => {
  router.back();
}

</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 我喜欢的专辑信息 </span>
    </template>
  </el-page-header>
  <el-table :data="bandAlbumInfo" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="albumId" label="专辑序号" width="150" />
    <el-table-column prop="name" label="专辑名称" width="150" />
    <el-table-column prop="company" label="发行公司" width="150" />
    <el-table-column prop="bandName" label="乐队名称" width="150" />
    <el-table-column prop="avgScore" label="专辑均分" width="150" />
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button link type="warning" v-if="scope.row.isLiked" @click="doNotLike(scope.row)">撤销喜欢</el-button>
        <el-button link type="primary" @click="doGetAlbumDetail(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
  <el-pagination background :current-page="albumCurrPage" layout="prev, pager, next" :total="albumTotal"
    :page-size="pageSize" @current-change="onAlbumCurrChange" />
</template>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 16px;
}
</style>


