<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ConcertBriefInfo, EditConcertReq } from '../../model/concert';
import { getCurrConcertInfo } from '../../service/concert';
import { formatDateTime } from '../../utils';

const router = useRouter();

const concertInfo = ref<ConcertBriefInfo[]>([]);

const goBack = () => {
  router.back();
}

const loadData = async () => {
  const res = await getCurrConcertInfo();
  res.forEach((item: ConcertBriefInfo) => {
    item.startTime = formatDateTime(item.startTime);
    item.endTime = formatDateTime(item.endTime);
  });
  concertInfo.value = res;
}

onMounted(async () => {
  await loadData();
})

const doGetConcertDetail = (_: any, row: any) => {
  router.push({
    path: "/concert/info",
    query: {
      id: row.concertId
    }
  });
}

const onConcertEdit = (row: any) => {
  console.log(row);
  editConcertOpt.value = true;
  // 修改演唱会信息
}

const editConcertOpt = ref(false);
const editConcertReq = ref({} as EditConcertReq)

</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 我的演唱会信息 </span>
    </template>
  </el-page-header>
  <el-table :data="concertInfo" style="width: 100%; margin-top: 36px;" max-height="250">
    <el-table-column fixed prop="concertId" label="演唱会序号" width="150" />
    <el-table-column prop="name" label="演唱会名称" width="120" />
    <el-table-column prop="startTime" label="开始时间" width="120" />
    <el-table-column prop="endTime" label="结束时间" width="120" />
    <el-table-column prop="maxNum" label="上限人数" width="120" />
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button link type="primary" @click="doGetConcertDetail(scope.$index, scope.row)">详情</el-button>
        <el-button link type="primary" @click="onConcertEdit(scope.row)">修改</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="60" />
    </template>
  </el-table>
</template>

<style scoped></style>
