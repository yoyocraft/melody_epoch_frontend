<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { BandBriefInfo } from "../../model/band/index";
import { listMyLikedBand } from "../../service/fan/index";
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
  req.likeId = row.albumId;
  req.type = LIKE_TYPE_MAP.LIKE_ALBUM;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadData();
  }
}

let tableData = ref<BandBriefInfo[]>([]);

const loadData = async () => {
  const res = await listMyLikedBand();
  tableData.value = res.map((info: BandBriefInfo) => {
    return { ...info, foundTime: formatDate(info.foundTime) };
  });
}
/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  await loadData();
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
</template>
../../utils/common
