<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { listBandInfoVO } from "../../service/band/index";
import { LIKE_TYPE_MAP, formatDate } from "../../utils/index";
import { ref } from "vue";
import { BandInfo } from "../../model/band/index";
import { JoinBandReq, MemberInfo } from "../../model/member/index";
import { error, success } from '../../utils/common';
import { LikeReq } from "../../model/fan";
import { like, unlike } from "../../service/fan";
import { joinBand, leaveBand, listMemberInBandByPage } from "../../service/member";
import { ConcertInfo } from "../../model/concert";
import { getBandConcertInfoByPage } from "../../service/concert";
import { AlbumInfo } from "../../model/album";
import { getBandAlbumsByPage } from "../../service/album";
import { Song } from "../../model/song";
import { getBandSongsByPage } from "../../service/song";

const bandInfo = ref({} as BandInfo);
const pageSize = 5;
const route = useRoute();
const router = useRouter();

let currBandId: number = 0;


onMounted(async () => {
  const bandIdStr = route.query?.id;
  if (typeof bandIdStr === "string") {
    const id = parseInt(bandIdStr, 10);
    if (!isNaN(id)) {
      currBandId = id;
    } else {
      error("非法信息！");
    }
  } else {
    error("非法信息！");
  }
  await loadBandData();
  await loadConcertByPage();
  await loadAlbumByPage();
  await loadSongByPage();
  await loadMemberByPage();
});

const doLike = async () => {
  const req = {} as LikeReq;
  req.likeId = currBandId;
  req.type = LIKE_TYPE_MAP.LIKE_BAND;
  const res = await like(req);
  if (res) {
    success("喜欢成功！")
    await loadBandData();
  }
}

const doNotLike = async () => {
  const req = {} as LikeReq;
  req.likeId = currBandId;
  req.type = LIKE_TYPE_MAP.LIKE_BAND;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadBandData();
  }
}

const doJoinBand = async () => {
  const req = {} as JoinBandReq;
  req.bandId = currBandId;
  const res = await joinBand(req);
  if (res) {
    success("加入成功")
    await loadBandData();
    await loadMemberByPage();
  }
}

const doLeaveBand = async () => {
  const req = {} as JoinBandReq;
  req.bandId = currBandId;
  const res = await leaveBand(req);
  if (res) {
    success("退出成功")
    await loadBandData();
    await loadMemberByPage();
  }
}

const goBack = () => {
  router.back();
}

/**
 * 乐队信息
 */
const loadBandData = async () => {
  const res = await listBandInfoVO(currBandId);
  res.foundTime = formatDate(res.foundTime);
  console.log("bandinfo : ", res);

  bandInfo.value = res;
}

/**
 * 成员信息
 */
const memberTotal = ref(0);
let memberCurrPage = 1
const onMemberCurrChange = async (curr: number) => {
  memberCurrPage = curr
  await loadMemberByPage();
}
const bandMemberInfo = ref<MemberInfo[]>([]);
const loadMemberByPage = async () => {
  const res = await listMemberInBandByPage(currBandId, memberCurrPage, pageSize);
  memberTotal.value = res.total
  bandMemberInfo.value = res.records.map((info: MemberInfo) => {
    return {
      ...info,
      part: info.part ?? " - ",
      joinTime: formatDate(info.joinTime),
      leaveTime: info.leaveTime ? formatDate(info.leaveTime) : " - ",
    };
  });
}

/**
 * 专辑信息
 */
const albumTotal = ref(0);
let albumCurrPage = 1
const onAlbumCurrChange = async (curr: number) => {
  albumCurrPage = curr
  await loadAlbumByPage();
}
const bandAlbumInfo = ref<AlbumInfo[]>([])
const loadAlbumByPage = async () => {
  const res = await getBandAlbumsByPage(currBandId, albumCurrPage, pageSize);
  albumTotal.value = res.total
  bandAlbumInfo.value = res.records.map((info: AlbumInfo) => {
    return {
      ...info,
      releaseTime: info.releaseTime ? formatDate(info.releaseTime) : " - "
    };
  });
}

/**
 * 歌曲信息
 */
const songTotal = ref(0);
let songCurrPage = 1
const onSongCurrChange = async (curr: number) => {
  songCurrPage = curr
  await loadSongByPage();
}
const bandSongInfo = ref<Song[]>([]);
const loadSongByPage = async () => {
  const res = await getBandSongsByPage(currBandId, songCurrPage, pageSize);
  songTotal.value = res.total
  bandSongInfo.value = res.records.map((info: Song) => {
    return {
      ...info,
      albumName: info.albumName ?? " - "
    };
  });
}

/**
 * 演唱会
 */
const concertTotal = ref(0);
let concertCurrPage = 1
const onConcertCurrChange = async (curr: number) => {
  concertCurrPage = curr
  await loadConcertByPage();
}
const bandConcertInfo = ref<ConcertInfo[]>([])
const loadConcertByPage = async () => {
  const res = await getBandConcertInfoByPage(currBandId, concertCurrPage, pageSize);
  concertTotal.value = res.total
  bandConcertInfo.value = res.records.map((info: ConcertInfo) => {
    return {
      ...info,
      startTime: formatDate(info.startTime),
      endTime: formatDate(info.endTime),
    };
  });
}

// TODO 歌曲信息、演唱会信息 跳转详情和喜欢
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
    <el-form-item label="乐队简介">
      <el-input v-model="bandInfo.profile" disabled maxlength="250" show-word-limit :autosize="{ minRows: 2, maxRows: 6 }"
        type="textarea" />
    </el-form-item>
  </el-form>

  <el-divider style="margin-top: 36px">
    <el-icon>
      <user />
    </el-icon>
    <span style="font-size: 20px"> 成员信息 </span>
  </el-divider>

  <div class="table-center">
    <el-table :data="bandMemberInfo" style="width: 100%" max-height="250">
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
    <el-pagination background :current-page="memberCurrPage" layout="prev, pager, next" :total="memberTotal"
      :page-size="pageSize" @current-change="onMemberCurrChange" />
  </div>

  <el-divider style="margin-top: 36px">
    <el-icon><video-play /></el-icon>
    <span style="font-size: 20px"> 歌曲信息</span>
  </el-divider>

  <div class="table-center">
    <el-table :data="bandSongInfo" style="width: 100%" max-height="250">
      <el-table-column fixed prop="songId" label="歌曲序号" width="150" />
      <el-table-column prop="name" label="歌曲名" width="120" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="albumName" label="所属专辑" width="120" />

      <template #empty>
        <el-empty :image-size="60" />
      </template>
    </el-table>
    <el-pagination background :current-page="songCurrPage" layout="prev, pager, next" :total="songTotal"
      :page-size="pageSize" @current-change="onSongCurrChange" />
  </div>

  <el-divider style="margin-top: 36px">
    <el-icon>
      <files />
    </el-icon>
    <span style="font-size: 20px"> 专辑信息</span>
  </el-divider>

  <div class="table-center">
    <el-table :data="bandAlbumInfo" style="width: 100%">
      <el-table-column fixed prop="albumId" label="专辑序号" width="150" />
      <el-table-column prop="name" label="专辑名" width="150" />
      <el-table-column prop="company" label="发行公司" width="150" />
      <el-table-column prop="releaseTime" label="发行时间" width="150" />
      <el-table-column prop="profile" label="简介" width="200" />
      <el-table-column prop="avgScore" label="均分" width="120" />
      <template #empty>
        <el-empty :image-size="60" />
      </template>
    </el-table>
    <el-pagination background :current-page="albumCurrPage" layout="prev, pager, next" :total="albumTotal"
      :page-size="pageSize" @current-change="onAlbumCurrChange" />
  </div>

  <el-divider style="margin-top: 36px">
    <el-icon>
      <tickets />
    </el-icon>
    <span style="font-size: 20px"> 演唱会信息</span>
  </el-divider>

  <div class="table-center">
    <el-table :data="bandConcertInfo" style="width: 100%" max-height="250">
      <el-table-column fixed prop="concertId" label="演唱会序号" width="150" />
      <el-table-column prop="name" label="演唱会名称" width="120" />
      <el-table-column prop="startTime" label="开始时间" width="120" />
      <el-table-column prop="endTime" label="结束时间" width="120" />
      <el-table-column prop="maxNum" label="上限人数" width="120" />
      <template #empty>
        <el-empty :image-size="60" />
      </template>
    </el-table>
    <el-pagination background :current-page="concertCurrPage" layout="prev, pager, next" :total="concertTotal"
      :page-size="pageSize" @current-change="onConcertCurrChange" />
  </div>
</template>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 16px;
}
</style>

