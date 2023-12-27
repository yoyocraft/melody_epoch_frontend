<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { BandBriefInfo } from "../../model/band/index";
import { listBandBriefInfoByPage } from "../../service/band/index";
import { LIKE_TYPE_MAP, SEARCH_TYPE, formatDate } from "../../utils/index";
import { useRouter } from "vue-router";
import { LikeReq } from "../../model/fan";
import { like, unlike } from "../../service/fan";
import { success } from '../../utils/common';
import { Search } from "@element-plus/icons-vue";
import { QueryReq, UserAuthType } from "../../model/user";
import { getAuthType, queryInfo } from "../../service/user";

const router = useRouter();
const doGetBandDetail = (_: any, row: any) => {
  router.push({
    path: "/band/info",
    query: {
      id: row.bandId
    }
  });
};

const doLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.albumId;
  req.type = LIKE_TYPE_MAP.LIKE_BAND;
  const res = await like(req);
  if (res) {
    success("喜欢成功！")
    await loadDataByPage();
  }
}

const doNotLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.albumId;
  req.type = LIKE_TYPE_MAP.LIKE_ALBUM;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadDataByPage();
  }
}

const currUserType = ref({} as UserAuthType);

let tableData = ref<BandBriefInfo[]>([]);

const loadDataByPage = async () => {
  let res;
  if (isOnSearch) {
    res = await queryInfo(queryReq.value);
    total.value = res.bandInfoVOPage.total
    tableData.value = res.bandInfoVOPage.records.map((info: BandBriefInfo) => {
      return { ...info, foundTime: formatDate(info.foundTime) };
    });
  } else {
    res = await listBandBriefInfoByPage(currPage);
    total.value = res.total
    tableData.value = res.records.map((info: BandBriefInfo) => {
      return { ...info, foundTime: formatDate(info.foundTime) };
    });
  }
}
/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  await loadDataByPage();
  const res = await getAuthType();
  currUserType.value = res;
});

const goBack = () => {
  router.back();
}

const doAddBand = () => {
  router.push({
    path: "/band/add",
  })
}

const total = ref(0);
let currPage = 1
const onCurrChange = async (curr: number) => {
  currPage = curr;
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
  queryReq.value.searchType = SEARCH_TYPE.BAND;
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
      <span class="text-large font-600 mr-3"> 乐队信息 </span>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="primary" v-if="!currUserType.isFan" class="ml-2" @click="doAddBand">创建乐队</el-button>
        <el-button type="success" style="margin-left: 16px;" class="ml-2" @click="onShowSearch">搜索</el-button>
        <el-button type="warning" class="ml-2" @click="onResetData">重置</el-button>
      </div>
    </template>
  </el-page-header>

  <el-table :data="tableData" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="bandId" label="乐队序号" width="150" />
    <el-table-column prop="name" label="乐队名称" width="150" />
    <el-table-column prop="foundTime" label="创建时间" width="150" />
    <el-table-column prop="leaderName" label="队长" width="150" />
    <el-table-column prop="memberNum" label="人数" width="150" />
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <template v-if="scope.canLike">
          <el-button link type="warning" v-if="scope.row.isLiked" @click="doNotLike(scope.row)">撤销喜欢</el-button>
          <el-button link type="success" v-else @click="doLike(scope.row)">加入喜欢</el-button>
        </template>
        <el-button link type="primary" @click="doGetBandDetail(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>

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

.search-button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>

