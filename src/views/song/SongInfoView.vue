<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SongInfo } from "../../model/song/index";
import { listSongInfo } from "../../service/song/index";
import { useRouter } from "vue-router";
import { LikeReq } from "../../model/fan";
import { LIKE_TYPE_MAP } from "../../utils";
import { like, unlike } from "../../service/fan";
import { success } from "../../service/common";
import SongTable from "../../components/SongTable.vue";

const router = useRouter();

const tableData = ref<SongInfo[]>([]);

const loadData = async () => {
  const res = await listSongInfo();
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

const doLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.songId;
  req.type = LIKE_TYPE_MAP.LIKE_SONG;
  const res = await like(req);
  if (res) {
    success("喜欢成功！")
    await loadData();
  }
}

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
  <SongTable :table-data="tableData" :do-like="doLike" :do-not-like="doNotLike" :has-opt="true"/>
</template>

<style scoped></style>
