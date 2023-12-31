<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AlbumInfo } from "../../model/album/index";
import { LikeReq } from "../../model/fan/index";
import { listAlbumBriefInfoByPage } from "../../service/album/index";
import { LIKE_TYPE_MAP, SEARCH_TYPE, formatDate } from "../../utils/index"
import { like, unlike } from "../../service/fan/index";
import { useRouter } from "vue-router";
import { success } from '../../utils/common';
import { QueryReq } from "../../model/user";
import { Search } from "@element-plus/icons-vue";
import { queryInfo } from "../../service/user";

const router = useRouter();
const doGetAlbumDetail = (_: any, row: any) => {
  router.push({
    path: "/album/info",
    query: {
      id: row.albumId
    }
  });
};

const doLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.albumId;
  req.type = LIKE_TYPE_MAP.LIKE_ALBUM;
  const res = await like(req);
  if (res) {
    success("喜欢成功！")
    await loadAlbumByPage();
  }
}

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

/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  await loadAlbumByPage();
});

const goBack = () => {
  router.back();
}

const pageSize = 15;
const albumTotal = ref(0);
let albumCurrPage = 1
const onAlbumCurrChange = async (curr: number) => {
  albumCurrPage = curr;
  queryReq.value.current = curr;
  await loadAlbumByPage();
}
const bandAlbumInfo = ref<AlbumInfo[]>([])
const loadAlbumByPage = async () => {
  let res;
  if (isOnSearch) {
    res = await queryInfo(queryReq.value);
    albumTotal.value = res.albumInfoVOPage.total
    bandAlbumInfo.value = res.albumInfoVOPage.records.map((info: AlbumInfo) => {
      return { ...info, releaseTime: info.releaseTime ? formatDate(info.releaseTime) : " - " };
    });
  } else {
    res = await listAlbumBriefInfoByPage(albumCurrPage);
    albumTotal.value = res.total
    bandAlbumInfo.value = res.records.map((info: AlbumInfo) => {
      return {
        ...info,
        releaseTime: info.releaseTime ? formatDate(info.releaseTime) : " - "
      };
    });
  }

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
  queryReq.value.searchType = SEARCH_TYPE.ALBUM;
  queryReq.value.current = albumCurrPage;
  isOnSearch = true;
  await loadAlbumByPage();
  showSearch.value = false;
}
const onResetData = async () => {
  isOnSearch = false;
  await loadAlbumByPage();
}

</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 专辑信息 </span>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="success" style="margin-left: 16px;" class="ml-2" @click="onShowSearch">搜索</el-button>
        <el-button type="warning" class="ml-2" @click="onResetData">重置</el-button>
      </div>
    </template>
  </el-page-header>
  <el-table :data="bandAlbumInfo" style="width: 100%; margin-top: 36px;" class="container">
    <el-table-column fixed prop="albumId" label="专辑序号" width="150" />
    <el-table-column prop="name" label="专辑名称" width="150" />
    <el-table-column prop="company" label="发行公司" width="150" />
    <el-table-column prop="bandName" label="乐队名称" width="150" />
    <el-table-column prop="avgScore" label="专辑均分" width="150" />
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <template v-if="scope.row.canLike">
          <el-button link type="warning" v-if="scope.row.isLiked" @click="doNotLike(scope.row)">撤销喜欢</el-button>
          <el-button link type="success" v-else @click="doLike(scope.row)">加入喜欢</el-button>
        </template>
        <el-button link type="primary" @click="doGetAlbumDetail(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
  <el-pagination background :current-page="albumCurrPage" layout="prev, pager, next" :total="albumTotal"
    :page-size="pageSize" @current-change="onAlbumCurrChange" />

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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
