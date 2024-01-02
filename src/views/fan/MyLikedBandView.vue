<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { BandBriefInfo } from "../../model/band/index";
import { listMyLikedBandByPage } from "../../service/fan/index";
import { LIKE_TYPE_MAP, formatDate } from "../../utils/index";
import { useRouter } from "vue-router";
import { LikeReq } from "../../model/fan";
import { unlike } from "../../service/fan";
import { success } from '../../utils/common';

const router = useRouter();
const doGetBandDetail = (_: any, row: any) => {
  router.push({
    path: "/band/info",
    query: {
      id: row.bandId
    }
  });
};

const doNotLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.bandId;
  req.type = LIKE_TYPE_MAP.LIKE_BAND;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadDataByPage();
  }
}

let tableData = ref<BandBriefInfo[]>([]);

const loadDataByPage = async () => {
  const res = await listMyLikedBandByPage(currPage, pageSize);
  total.value = res.total
  tableData.value = res.records.map((info: BandBriefInfo) => {
    return { ...info, foundTime: formatDate(info.foundTime) };
  });
}
const pageSize = 15;
const total = ref(0);
let currPage = 1
const onCurrChange = async (curr: number) => {
  currPage = curr
  await loadDataByPage();
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
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 我喜欢的乐队信息 </span>
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
        <el-button link type="warning" v-if="scope.row.isLiked" @click="doNotLike(scope.row)">撤销喜欢</el-button>
        <el-button link type="primary" @click="doGetBandDetail(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
  <el-pagination background :current-page="currPage" layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="onCurrChange" />
</template>


<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 16px;
}
</style>
