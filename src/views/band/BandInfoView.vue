<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { BandBriefInfo } from "../../model/band/index";
import { listBandBriefInfo } from "../../service/band/index";
import { formatDate } from "../../utils/index";
import { useRouter } from "vue-router";

const router = useRouter();
const doGetBandDetail = (_: any, row: any) => {
  router.push({
    path: "/band/info",
    query: {
      id: row.bandId
    }
  });
};

let tableData = ref<BandBriefInfo[]>([]);

/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  const res = await listBandBriefInfo();
  console.log(res);
  tableData.value = res.map((info: BandBriefInfo) => {
    return { ...info, foundTime: formatDate(info.foundTime) };
  });
});

const goBack = () => {
  router.back();
}

const doAddBand = () => {
  router.push({
    path: "/band/add",
  })
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #extra>
      <div class="flex items-center">
        <el-button type="primary" class="ml-2" @click="doAddBand">创建乐队</el-button>
      </div>
    </template>
  </el-page-header>
  <el-divider style="margin-top: 36px; margin-bottom: 36px">
    <span style="font-size: 30px; color: rgb(16, 141, 219)">所有乐队信息</span>
  </el-divider>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="bandId" label="乐队序号" width="150" />
    <el-table-column prop="name" label="乐队名称" width="120" />
    <el-table-column prop="foundTime" label="创建时间" width="150" />
    <el-table-column prop="leaderName" label="队长" width="150" />
    <el-table-column prop="memberNum" label="人数" width="150" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="doGetBandDetail(scope.$index, scope.row)">Detail</el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
</template>
