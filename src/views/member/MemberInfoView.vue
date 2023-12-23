<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MemberInfo } from "../../model/member/index";
import { listMemberInfoByPage } from "../../service/member/index";
import { GENDER_MAP } from "../../utils/index";
import { useRouter } from "vue-router";

const router = useRouter();

const tableData = ref<MemberInfo[]>([]);

const loadDataByPage = async () => {
  const res = await listMemberInfoByPage(currPage);
  total.value = res.total
  tableData.value = res.records.map((info: MemberInfo) => {
    return {
      ...info,
      gender: GENDER_MAP[info.gender],
      joinTime: info.joinTime ?? "-",
      leaveTime: info.leaveTime ?? "-",
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
let currPage = 1
const onCurrChange = async (curr: number) => {
  currPage = curr
  await loadDataByPage();
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 乐队成员信息 </span>
    </template>
  </el-page-header>
  <el-table :data="tableData" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="memberId" label="成员序号" width="150" />
    <el-table-column prop="name" label="成员姓名" width="150" />
    <el-table-column prop="gender" label="性别" width="150" />
    <el-table-column prop="age" label="年龄" width="150" />
    <el-table-column prop="part" label="分工" width="150" />
    <el-table-column prop="bandName" label="乐队名称" width="150" />
    <el-table-column prop="joinTime" label="加入时间" width="180" />
    <el-table-column prop="leaveTime" label="离开时间" width="180" />
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
