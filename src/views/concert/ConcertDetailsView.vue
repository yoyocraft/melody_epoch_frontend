<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { listCurrConcertInfoVO, joinConcert, leaveConcert } from "../../service/concert/index";
import { LIKE_TYPE_MAP, formatDateTime } from "../../utils/index";
import { ref } from "vue";
import { ConcertInfo, JoinConcertReq } from "../../model/concert/index";
import { error, success } from '../../utils/common';
import { LikeReq } from "../../model/fan";
import { like, unlike } from "../../service/fan";
import { SongInfo } from "../../model/song";

const concertInfo = ref({} as ConcertInfo);

const route = useRoute();
const router = useRouter();

let currConcertId: number = 0;

const loadData = async () => {
  const concertId = route.query?.id;
  if (typeof concertId === "string") {
    const id = parseInt(concertId, 10);
    if (!isNaN(id)) {
      const res = await listCurrConcertInfoVO(id);
      currConcertId = id;
      res.startTime = formatDateTime(res.startTime);
      res.endTime = formatDateTime(res.endTime)
      res.songInfoVOList.forEach((songInfo: SongInfo) => {
        songInfo.albumName = songInfo.albumName ?? " - ";
      });
      res.joinedNum = res.joinedNum ?? 0;
      concertInfo.value = res;
    } else {
      error("非法信息！");
    }
  } else {
    error("非法信息！");
  }
}
onMounted(async () => {
  await loadData();
});

const doJoin = async () => {
  const req = {} as JoinConcertReq;
  req.concertId = currConcertId;
  const res = await joinConcert(req);
  if (res) {
    success("参加成功！")
    loadData();
  }
}

const doNotJoin = async () => {
  const req = {} as JoinConcertReq;
  req.concertId = currConcertId;
  const res = await leaveConcert(req);
  if (res) {
    success("取消参加成功！")
    loadData();
  }
}

const doLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.songId;
  req.type = LIKE_TYPE_MAP.LIKE_SONG;
  const res = await like(req);
  if (res) {
    success("喜欢成功！")
    await loadData();
  }
}

const doNotLike = async (row: any) => {
  const req = {} as LikeReq;
  req.likeId = row.songId;
  req.type = LIKE_TYPE_MAP.LIKE_SONG;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadData();
  }
}

const goBack = () => {
  router.back();
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 演唱会详细信息 </span>
    </template>
    <template #extra>
      <div class="flex items-center">
        <template v-if="concertInfo.canJoin">
          <el-button type="warning" size="large" class="ml-2" v-if="concertInfo.isJoined"
            @click="doNotJoin">取消参加</el-button>
          <el-button type="success" size="large" class="ml-2" v-else-if="!concertInfo.isJoined && concertInfo.canJoin"
            @click="doJoin">参加</el-button>
          <el-tooltip v-else class="box-item" effect="dark" content="不允许加入（已过开始时间或者人数已满）" placement="left-start">
            <el-button type="success" size="large" class="ml-2" disabled>参加</el-button>
          </el-tooltip>
        </template>
      </div>
    </template>
  </el-page-header>


  <el-divider style="margin-top: 36px; margin-bottom: 36px;">
    <el-icon>
      <ticket />
    </el-icon>
    <span style="font-size: 25px"> 演唱会信息 </span>
  </el-divider>

  <el-form :model="concertInfo" label-width="120px" style="margin-top: 16px; text-align: center">
    <el-form-item label="演唱会序号">
      <el-input disabled v-model="concertInfo.concertId" />
    </el-form-item>
    <el-form-item label="演唱会名称">
      <el-input disabled v-model="concertInfo.name" />
    </el-form-item>
    <el-form-item label="乐队名称">
      <el-input disabled v-model="concertInfo.bandName" />
    </el-form-item>
    <el-form-item label="开始时间">
      <el-input disabled v-model="concertInfo.startTime" />
    </el-form-item>
    <el-form-item label="结束时间">
      <el-input disabled v-model="concertInfo.endTime" />
    </el-form-item>
    <el-form-item label="地点">
      <el-input disabled v-model="concertInfo.bandName" />
    </el-form-item>
    <el-form-item label="上限人数">
      <el-input disabled v-model="concertInfo.maxNum" />
    </el-form-item>
    <el-form-item label="已加入人数">
      <el-input disabled v-model="concertInfo.joinedNum" />
    </el-form-item>
  </el-form>


  <el-divider style="margin-top: 36px">
    <el-icon><video-play /></el-icon>
    <span style="font-size: 20px"> 歌曲信息</span>
  </el-divider>

  <div class="table-center">
    <el-table :data="concertInfo.songInfoVOList" style="width: 100%" max-height="250">
      <el-table-column fixed prop="songId" label="歌曲序号" width="150" />
      <el-table-column prop="name" label="歌曲名" width="120" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="albumName" label="所属专辑" width="120" />
      <el-table-column prop="bandName" label="乐队名称" width="120" />
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <template v-if="scope.row.canLike">
            <el-button link type="warning" v-if="scope.row.isLiked" @click="doNotLike(scope.row)">撤销喜欢</el-button>
            <el-button link type="success" v-else @click="doLike(scope.row)">加入喜欢</el-button>
          </template>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty :image-size="60" />
      </template>
    </el-table>
  </div>
</template>

<style scoped>
.tooltip-base-box {
  width: 600px;
}

.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tooltip-base-box .center {
  justify-content: center;
}

.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
../../utils/common
