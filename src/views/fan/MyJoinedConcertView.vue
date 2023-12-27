<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ConcertBriefInfo, JoinConcertReq } from "../../model/concert/index";
import { formatDateTime } from "../../utils/index";
import { useRouter } from "vue-router";
import { listMyJoinedConcertByPage } from "../../service/fan";
import { leaveConcert } from "../../service/concert";
import { success } from "../../utils/common";
import { InfoFilled } from "@element-plus/icons-vue";

const router = useRouter();
const doGetDetails = (_: any, row: any) => {
  router.push({
    path: "/concert/info",
    query: {
      id: row.concertId
    }
  });
};

const doLeaveConcert = async (row: any) => {
  const req = {} as JoinConcertReq;
  req.concertId = row.concertId;
  const res = await leaveConcert(req);
  if (res) {
    success("取消参加成功！")
    await loadDataByPage();
  }

}
const tableData = ref<ConcertBriefInfo[]>([]);

const loadDataByPage = async () => {
  const res = await listMyJoinedConcertByPage(currPage, pageSize);
  total.value = res.total
  tableData.value = res.records.map((info: ConcertBriefInfo) => {
    return {
      ...info,
      startTime: formatDateTime(info.startTime),
      endTime: formatDateTime(info.endTime)
    };
  });
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
const pageSize = 15;
let currPage = 1
const onCurrChange = async (curr: number) => {
  currPage = curr
  await loadDataByPage();
}



</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 演唱会信息 </span>
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
        <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="再想想" :icon="InfoFilled"
          icon-color="#626AEF" title="确认取消参加？" @confirm="doLeaveConcert(scope.row)">
          <template #reference>
            <el-button link type="warning">取消参加</el-button>
          </template>
        </el-popconfirm>

      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
  <el-pagination background :current-page="currPage" layout="prev, pager, next" :total="total" :page-size="15"
    @current-change="onCurrChange" />
</template>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 16px;
}
</style>
