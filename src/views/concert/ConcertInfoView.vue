<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ConcertBriefInfo } from "../../model/concert/index";
import { listConcertBriefInfo } from "../../service/concert/index";
import { formatDateTime } from "../../utils/index";
import { useRouter } from "vue-router";

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

/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  const res = await listConcertBriefInfo();
  tableData.value = res.map((info: ConcertBriefInfo) => {
    return {
      ...info,
      startTime: formatDateTime(info.startTime),
      endTime: formatDateTime(info.endTime)
    };
  });
});

const goBack = () => {
  router.back();
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
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
</template>

<style scoped></style>
