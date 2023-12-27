<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ConcertBriefInfo } from "../../model/concert/index";
import { listConcertBriefInfoByPage } from "../../service/concert/index";
import { SEARCH_TYPE, formatDateTime } from "../../utils/index";
import { useRouter } from "vue-router";
import { QueryReq } from "../../model/user";
import { queryInfo } from "../../service/user";
import { Search } from "@element-plus/icons-vue";

const router = useRouter();
const doGetDetails = (_: any, row: any) => {
  router.push({
    path: "/concert/info",
    query: {
      id: row.concertId
    }
  });
};

const tableData = ref<ConcertBriefInfo[]>([]);

const loadDataByPage = async () => {
  let res;
  if (isOnSearch) {
    res = await queryInfo(queryReq.value);
    total.value = res.concertInfoVOPage.total
    tableData.value = res.concertInfoVOPage.records.map((info: ConcertBriefInfo) => {
      return {
        ...info, startTime: formatDateTime(info.startTime),
        endTime: formatDateTime(info.endTime)
      };
    });
  } else {
    res = await listConcertBriefInfoByPage(currPage);
    total.value = res.total
    tableData.value = res.records.map((info: ConcertBriefInfo) => {
      return {
        ...info,
        startTime: formatDateTime(info.startTime),
        endTime: formatDateTime(info.endTime)
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
  queryReq.value.searchType = SEARCH_TYPE.COCNERT;
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
      <span class="text-large font-600 mr-3"> 演唱会信息 </span>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="success" style="margin-left: 16px;" class="ml-2" @click="onShowSearch">搜索</el-button>
        <el-button type="warning" class="ml-2" @click="onResetData">重置</el-button>
      </div>
    </template>
  </el-page-header>
  <el-table :data="tableData" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="concertId" label="演唱会序号" width="150" />
    <el-table-column prop="name" label="演唱会名称" width="150" />
    <el-table-column prop="bandName" label="乐队名称" width="150" />
    <el-table-column prop="startTime" label="开始时间" width="180" />
    <el-table-column prop="endTime" label="结束时间" width="180" />
    <el-table-column prop="place" label="地点" width="150" />
    <el-table-column prop="maxNum" label="上限人数" width="150" />
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button link type="primary" @click="doGetDetails(scope.$index, scope.row)">详情</el-button>
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
</style>
