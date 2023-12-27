<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SongInfo } from "../../model/song/index";
import { listSongInfoByPage } from "../../service/song/index";
import { useRouter } from "vue-router";
import { LikeReq } from "../../model/fan";
import { LIKE_TYPE_MAP, SEARCH_TYPE } from "../../utils";
import { like, unlike } from "../../service/fan";
import { success } from '../../utils/common';
import SongTable from "../../components/SongTable.vue";
import { QueryReq } from "../../model/user";
import { Search } from "@element-plus/icons-vue";
import { queryInfo } from "../../service/user";

const router = useRouter();

const tableData = ref<SongInfo[]>([]);

const loadDataByPage = async () => {
  let res;
  if (isOnSearch) {
    console.log(queryReq.value);

    res = await queryInfo(queryReq.value);
    total.value = res.songInfoVOPage.total
    tableData.value = res.songInfoVOPage.records.map((info: SongInfo) => {
      return { ...info, albumName: info.albumName ?? " - " };
    });
  } else {
    res = await listSongInfoByPage(currPage);
    total.value = res.total
    tableData.value = res.records.map((info: SongInfo) => {
      return {
        ...info,
        albumName: info.albumName ?? " - "
      };
    });
  }
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
  queryReq.value.current = curr;
  await loadDataByPage();
}


const showSearch = ref(false);
const searchText = ref("")
let isOnSearch = false;
const onShowSearch = () => {
  searchText.value = "";
  showSearch.value = true;
}
const queryReq = ref({} as QueryReq);
const onSearchConfirm = async () => {
  queryReq.value.searchText = searchText.value;
  queryReq.value.searchType = SEARCH_TYPE.SONG;
  queryReq.value.current = currPage;
  isOnSearch = true;
  await loadDataByPage();
  showSearch.value = false;
}
const onResetData = async () => {
  isOnSearch = false;
  await loadDataByPage();
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 歌曲信息 </span>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="success" style="margin-left: 16px;" class="ml-2" @click="onShowSearch">搜索</el-button>
        <el-button type="warning" class="ml-2" @click="onResetData">重置</el-button>
      </div>
    </template>
  </el-page-header>
  <SongTable :table-data="tableData" :do-like="doLike" :do-not-like="doNotLike" :has-opt="true" />
  <el-pagination background :current-page="currPage" layout="prev, pager, next" :total="total" :page-size="15"
    @current-change="onCurrChange" />

  <el-dialog v-model="showSearch" :show-close="false" title="搜索" center width="60%">
    <el-input v-model="searchText" placeholder="搜索关键词" class="input-with-select">
      <template #append>
        <el-button :icon="Search" class="search-button" @click="onSearchConfirm">搜索</el-button>
      </template>
    </el-input>
  </el-dialog>
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

