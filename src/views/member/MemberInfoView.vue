<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MemberInfo } from "../../model/member/index";
import { listMemberInfo } from "../../service/member/index";
import { GENDER_MAP } from "../../utils/index";
import { useRouter } from "vue-router";

const router = useRouter();


const tableData = ref<MemberInfo[]>([]);

/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  const res = await listMemberInfo();
  console.log("@@ ", res);
  tableData.value = res.map((info: MemberInfo) => {
    return {
      ...info,
      gender: GENDER_MAP[info.gender],
      joinTime: info.joinTime ?? "-",
      leaveTime: info.leaveTime ?? "-",
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
</template>

<style scoped></style>
