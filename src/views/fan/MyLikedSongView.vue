<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SongInfo } from "../../model/song/index";
import { listMyLikedSong } from "../../service/fan/index";
import { useRouter } from "vue-router";
import { LikeReq } from "../../model/fan";
import { LIKE_TYPE_MAP } from "../../utils";
import { unlike } from "../../service/fan";
import { success } from "../../service/common";

const router = useRouter();

const tableData = ref<SongInfo[]>([]);

const loadData = async () => {
  const res = await listMyLikedSong();
  tableData.value = res.map((info: SongInfo) => {
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



const doNotLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.songId;
  req.type = LIKE_TYPE_MAP.LIKE_SONG;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadData();
  }
}

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
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button link type="warning" v-if="scope.row.isLiked" @click="doNotLike(scope.row)">撤销喜欢</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
</template>

<style scoped></style>
