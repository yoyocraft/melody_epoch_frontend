<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SongInfo } from "../../model/song/index";
import { listSongInfoByPage } from "../../service/song/index";
import { useRouter } from "vue-router";
import { LikeReq } from "../../model/fan";
import { LIKE_TYPE_MAP } from "../../utils";
import { like, unlike } from "../../service/fan";
import { success } from '../../utils/common';
import SongTable from "../../components/SongTable.vue";

const router = useRouter();

const tableData = ref<SongInfo[]>([]);

const loadDataByPage = async () => {
  const res = await listSongInfoByPage(currPage);
  total.value = res.total
  tableData.value = res.records.map((info: SongInfo) => {
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
  await loadDataByPage();
});

const doLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.songId;
  req.type = LIKE_TYPE_MAP.LIKE_SONG;
  const res = await like(req);
  if (res) {
    success("喜欢成功！")
    await loadDataByPage();
  }
}

const doNotLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.songId;
  req.type = LIKE_TYPE_MAP.LIKE_SONG;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadDataByPage();
  }
}

const goBack = () => {
  router.back();
}

const total = ref(0);
let currPage = 1
const onCurrChange = async (curr: number) => {
  currPage = curr
  await loadDataByPage();
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 歌曲信息 </span>
    </template>
  </el-page-header>
  <SongTable :table-data="tableData" :do-like="doLike" :do-not-like="doNotLike" :has-opt="true" />
  <el-pagination background :current-page="currPage" layout="prev, pager, next" :total="total" :page-size="15"
    @current-change="onCurrChange" />
</template>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 16px;
}

.table-container {
  max-width: auto;
  /* 设置最大宽度为800px，根据需要进行调整 */
  margin: 0 auto;
  /* 水平居中 */
}
</style>

