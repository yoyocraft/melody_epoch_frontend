<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { BandBriefInfo } from "../../model/band/index";
import { listBandBriefInfo } from "../../service/band/index";
import { formatDate } from "../../utils/index";
import { useRouter } from "vue-router";

const router = useRouter();
const doGetBandDetail = (_: any, row: any) => {
  router.push({
    path: "/band/info/" + row.bandId,
  });
};

let tableData = ref<BandBriefInfo[]>([]);

onMounted(async () => {
  const res = await listBandBriefInfo();
  console.log(res);
  tableData.value = res.map((info: BandBriefInfo) => {
    return { ...info, foundTime: formatDate(info.foundTime) };
  });
});
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="bandId" label="乐队序号" width="150" />
    <el-table-column prop="name" label="乐队名称" width="120" />
    <el-table-column prop="foundTime" label="创建时间" width="150" />
    <el-table-column prop="leaderName" label="队长" width="150" />
    <el-table-column prop="memberNum" label="人数" width="150" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="doGetBandDetail(scope.$index, scope.row)"
          >Detail</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
