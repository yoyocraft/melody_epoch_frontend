<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'
import { EditPartReq, MemberInfo } from "../../model/member/index"
import { listMemberInCurrBand, editPart } from "../../service/member/index"
import { success } from '../../utils/common';


const router = useRouter();

const loadData = async () => {
  const res = await listMemberInCurrBand();

  if (res) {
    memberData.value = res.map((info: MemberInfo) => {
      return { ...info, part: info.part ?? " - " };
    });;
  }
}

onMounted(async () => {
  await loadData();
})


const memberData = ref<MemberInfo[]>([])

const editPartReq = ref({} as EditPartReq)

const bandRoles = [
  {
    value: '主唱',
    label: '主唱',
  },
  {
    value: '吉他手',
    label: '吉他手',
  },
  {
    value: '贝斯手',
    label: '贝斯手',
  },
  {
    value: '鼓手',
    label: '鼓手',
  },
  {
    value: '键盘手',
    label: '键盘手',
  },
]


const goBack = () => {
  router.back();
}

const doEditPart = async (_: any, row: any) => {
  editPartReq.value.memberId = row.memberId;
  const res = await editPart(editPartReq.value);
  if (res) {
    success("分工成功！")
    await loadData();
  }
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 成员分工信息 </span>
    </template>
  </el-page-header>

  <el-table :data="memberData" style="width: 100%; margin-top: 36px;" class="container">
    <el-table-column prop="memberId" label="成员序号" width="150" />
    <el-table-column prop="name" label="成员姓名" width="200" />
    <el-table-column prop="part" label="当前分工" width="200" />
    <el-table-column label="选择分工" width="250">
      <el-select v-model="editPartReq.part" placeholder="请选择分工">
        <el-option v-for="item in bandRoles" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="primary" @click="doEditPart(scope.$index, scope.row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
</style>
