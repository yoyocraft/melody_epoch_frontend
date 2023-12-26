<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { listCurrBandInfoVO, releaseBandInfo, unReleaseBandInfo, currBandReleaseStatus, editBandInfo } from "../../service/band/index";
import { formatDate } from "../../utils/index";
import { ref } from "vue";
import { BandInfo, EditBandReq } from "../../model/band/index";
import { MemberInfo } from "../../model/member/index";
import { AlbumInfo } from "../../model/album/index";
import { ConcertInfo } from "../../model/concert/index";
import { Song } from "../../model/song";
import { success } from '../../utils/common';
import { currBandSongsByPage } from "../../service/song";
import { currBandAllAlbumsByPage } from "../../service/album";
import { getCurrConcertInfoByPage } from "../../service/concert";
import { listMemberInCurrBandByPage } from "../../service/member";

const pageSize = 5;
const bandInfo = ref({} as BandInfo);
const router = useRouter();
const releaseStatus = ref(false);

const doRelease = async () => {
  const res = await releaseBandInfo();
  if (res) {
    success("发布成功！")
    await loadReleaseStatus();
  }
}

const doUnRelease = async () => {
  const res = await unReleaseBandInfo();
  if (res) {
    success("撤销发布成功！")
    await loadReleaseStatus();
  }
}

const editBandOpt = ref(false);

const loadReleaseStatus = async () => {
  releaseStatus.value = await currBandReleaseStatus();
}
/**
 * 乐队信息
 */
let currBandId: number = 0;
const loadBandInfo = async () => {
  const res = await listCurrBandInfoVO();
  currBandId = res.bandId;
  res.foundTime = formatDate(res.foundTime);
  bandInfo.value = res;
}

onMounted(async () => {
  await loadBandInfo();
  await loadSongByPage();
  await loadReleaseStatus();
  await loadAlbumByPage();
  await loadConcertByPage();
  await loadMemberByPage();
});


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
  const res = await listMemberInCurrBandByPage(memberCurrPage, pageSize);
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
  const res = await currBandSongsByPage(songCurrPage, pageSize);
  songTotal.value = res.total
  bandSongInfo.value = res.records.map((info: Song) => {
    return {
      ...info,
      albumName: info.albumName ?? " - "
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
  const res = await currBandAllAlbumsByPage(albumCurrPage, pageSize);
  albumTotal.value = res.total
  bandAlbumInfo.value = res.records.map((info: AlbumInfo) => {
    return {
      ...info,
      releaseTime: info.releaseTime ? formatDate(info.releaseTime) : " - "
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
  const res = await getCurrConcertInfoByPage(concertCurrPage, pageSize);
  concertTotal.value = res.total
  bandConcertInfo.value = res.records.map((info: ConcertInfo) => {
    return {
      ...info,
      startTime: formatDate(info.startTime),
      endTime: formatDate(info.endTime),
    };
  });
}

const goBack = () => {
  router.back();
}

const editBandReq = ref({} as EditBandReq);
const onBandEditSubmit = async () => {
  editBandReq.value.bandId = currBandId;
  const res = await editBandInfo(editBandReq.value);
  if (res) {
    success("修改成功")
    editBandOpt.value = false;
    editBandReq.value = {} as EditBandReq;
    await loadBandInfo();
  }
}

const onBandEditCancel = async () => {
  editBandOpt.value = false;
  editBandReq.value = {} as EditBandReq;
}


</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 我的乐队信息 </span>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button size="large" type="primary" @click="editBandOpt = true" class="ml-2">修改乐队信息</el-button>
        <el-button v-if="releaseStatus" size="large" type="danger" @click="doUnRelease" class="ml-2">撤销发布</el-button>
        <el-button v-else type="primary" size="large" @click="doRelease" class="ml-2">发布</el-button>
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
    <el-table :data="bandAlbumInfo" style="width: 100%" max-height="250">
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
      <el-table-column prop="startTime" label="开始时间" width="200" />
      <el-table-column prop="endTime" label="结束时间" width="200" />
      <el-table-column prop="maxNum" label="上限人数" width="120" />
      <template #empty>
        <el-empty :image-size="60" />
      </template>
    </el-table>
    <el-pagination background :current-page="concertCurrPage" layout="prev, pager, next" :total="concertTotal"
      :page-size="pageSize" @current-change="onConcertCurrChange" />
  </div>

  <el-drawer v-model="editBandOpt" title="修改乐队信息" direction="rtl" size="80%">
    <!-- 修改昵称等信息 -->
    <el-form label-width="120px">
      <el-form-item label="简介">
        <el-input v-model="editBandReq.profile" maxlength="250" show-word-limit :autosize="{ minRows: 2, maxRows: 6 }"
          type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onBandEditSubmit">修改</el-button>
        <el-button @click="onBandEditCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 16px;
}
</style>

