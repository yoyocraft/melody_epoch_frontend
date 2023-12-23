<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { listBandInfoVO } from "../../service/band/index";
import { LIKE_TYPE_MAP, formatDate } from "../../utils/index";
import { ref } from "vue";
import { BandInfo } from "../../model/band/index";
import { JoinBandReq, Member } from "../../model/member/index";
import { Album } from "../../model/album/index";
import { Concert } from "../../model/concert/index";
import { error, success } from "../../service/common";
import { LikeReq } from "../../model/fan";
import { like, unlike } from "../../service/fan";
import { joinBand, leaveBand } from "../../service/member";
import SongTable from "../../components/SongTable.vue";

const bandInfo = ref({} as BandInfo);

const route = useRoute();
const router = useRouter();

let currBandId: number = 0;

// TODO 修改这部分的分页内容 && 乐队成员入队部分 canJoin放置
const loadData = async () => {
  const bandId = route.query?.id;
  if (typeof bandId === "string") {
    const id = parseInt(bandId, 10);
    if (!isNaN(id)) {
      const res = await listBandInfoVO(id);
      currBandId = id;
      res.foundTime = formatDate(res.foundTime);
      res.members?.forEach((member: Member) => {
        member.joinTime = formatDate(member.joinTime);
        member.leaveTime = formatDate(member.leaveTime);
        member.part = member.part ?? " - ";
      });
      res.albums?.forEach((album: Album) => {
        album.releaseTime = formatDate(album.releaseTime);
      });
      res.concerts?.forEach((concert: Concert) => {
        concert.startTime = formatDate(concert.startTime);
        concert.endTime = formatDate(concert.endTime);
      });
      bandInfo.value = res;
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

const doLike = async () => {
  const req = {} as LikeReq;
  req.likeId = currBandId;
  req.type = LIKE_TYPE_MAP.LIKE_BAND;
  const res = await like(req);
  if (res) {
    success("喜欢成功！")
    await loadData();
  }
}

const doNotLike = async () => {
  const req = {} as LikeReq;
  req.likeId = currBandId;
  req.type = LIKE_TYPE_MAP.LIKE_BAND;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadData();
  }
}

const doJoinBand = async () => {
  const req = {} as JoinBandReq;
  req.bandId = currBandId;
  const res = await joinBand(req);
  if (res) {
    success("加入成功")
    await loadData();
  }
}

const doLeaveBand = async () => {
  const req = {} as JoinBandReq;
  req.bandId = currBandId;
  const res = await leaveBand(req);
  if (res) {
    success("退出成功")
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
      <span class="text-large font-600 mr-3"> 乐队详细信息 </span>
    </template>
    <template #extra>
      <div class="flex items-center">
        <template v-if="bandInfo.canLike">
          <el-button type="warning" size="large" class="ml-2" v-if="bandInfo.isLiked" @click="doNotLike">撤销喜欢</el-button>
          <el-button type="success" size="large" class="ml-2" v-else @click="doLike">加入喜欢</el-button>
        </template>
        <template v-if="bandInfo.canJoin">
          <el-button type="warning" size="large" class="ml-2" v-if="bandInfo.isJoined"
            @click="doLeaveBand">退出乐队</el-button>
          <el-button type="success" size="large" class="ml-2" v-else @click="doJoinBand">加入乐队</el-button>
        </template>
      </div>
    </template>
  </el-page-header>


  <el-divider style="margin-top: 36px; margin-bottom: 36px;">
    <el-icon>
      <mic />
    </el-icon>
    <span style="font-size: 25px"> 乐队信息 </span>
  </el-divider>

  <el-form :model="bandInfo" label-width="120px" style="margin-top: 16px; text-align: center">
    <el-form-item label="乐队序号">
      <el-input disabled v-model="bandInfo.bandId" />
    </el-form-item>
    <el-form-item label="乐队名称">
      <el-input disabled v-model="bandInfo.name" />
    </el-form-item>
    <el-form-item label="创建时间">
      <el-input disabled v-model="bandInfo.foundTime" />
    </el-form-item>
    <el-form-item label="队长">
      <el-input disabled v-model="bandInfo.leaderName" />
    </el-form-item>
    <el-form-item label="人数">
      <el-input disabled v-model="bandInfo.memberNum" />
    </el-form-item>
  </el-form>

  <el-divider style="margin-top: 36px">
    <el-icon>
      <user />
    </el-icon>
    <span style="font-size: 20px"> 成员信息 </span>
  </el-divider>

  <div class="table-center">
    <el-table :data="bandInfo.members" style="width: 100%" max-height="250">
      <el-table-column fixed prop="memberId" label="成员序号" width="150" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="age" label="年龄" width="120" />
      <el-table-column prop="part" label="分工" width="120" />
      <el-table-column prop="joinTime" label="加入时间" width="120" />
      <el-table-column prop="leaveTime" label="退出时间" width="120" />
      <template #empty>
        <el-empty :image-size="60" />
      </template>
    </el-table>
  </div>

  <el-divider style="margin-top: 36px">
    <el-icon><video-play /></el-icon>
    <span style="font-size: 20px"> 歌曲信息</span>
  </el-divider>

  <div class="table-center">
    <song-table :table-data="bandInfo.songs" :has-opt="false" />
  </div>

  <el-divider style="margin-top: 36px">
    <el-icon>
      <files />
    </el-icon>
    <span style="font-size: 20px"> 专辑信息</span>
  </el-divider>

  <div class="table-center">
    <el-table :data="bandInfo.albums" style="width: 100%" max-height="250">
      <el-table-column fixed prop="albumId" label="专辑序号" width="150" />
      <el-table-column prop="name" label="专辑名" width="120" />
      <el-table-column prop="company" label="发行公司" width="120" />
      <el-table-column prop="releaseTime" label="发行时间" width="120" />
      <el-table-column prop="profile" label="简介" width="120" />
      <el-table-column prop="avgScore" label="均分" width="120" />
      <template #empty>
        <el-empty :image-size="60" />
      </template>
    </el-table>
  </div>

  <el-divider style="margin-top: 36px">
    <el-icon>
      <tickets />
    </el-icon>
    <span style="font-size: 20px"> 演唱会信息</span>
  </el-divider>

  <div class="table-center">
    <el-table :data="bandInfo.concerts" style="width: 100%" max-height="250">
      <el-table-column fixed prop="concertId" label="演唱会序号" width="150" />
      <el-table-column prop="name" label="演唱会名称" width="120" />
      <el-table-column prop="startTime" label="开始时间" width="120" />
      <el-table-column prop="endTime" label="结束时间" width="120" />
      <el-table-column prop="maxNum" label="上限人数" width="120" />
      <template #empty>
        <el-empty :image-size="60" />
      </template>
    </el-table>
  </div>
</template>

<style scoped></style>
