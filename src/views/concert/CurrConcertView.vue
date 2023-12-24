<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ConcertBriefInfo, EditConcertReq, ReleaseConcertReq } from '../../model/concert';
import { getCurrConcertDetails, editConcertInfo, releaseConcert, unReleaseConcert, getCurrConcertInfoByPage } from '../../service/concert';
import { listSongItems } from '../../service/song';
import { formatDateTime } from '../../utils';
import { TransferOption } from '../../model/common';
import { SongInfo } from '../../model/song';
import { error, success } from '../../utils/common';
import { Promotion } from '@element-plus/icons-vue';

const router = useRouter();

const concertInfo = ref<ConcertBriefInfo[]>([]);

const goBack = () => {
  router.back();
}

const pageSize = 15;
const loadDataByPage = async () => {
  const res = await getCurrConcertInfoByPage(currPage, pageSize);
  console.log(res);

  total.value = res.total;
  res.records.forEach((item: ConcertBriefInfo) => {
    item.startTime = formatDateTime(item.startTime);
    item.endTime = formatDateTime(item.endTime);
  });
  concertInfo.value = res.records;
}


onMounted(async () => {
  await loadDataByPage();
})

const doGetConcertDetail = (_: any, row: any) => {
  router.push({
    path: "/concert/info",
    query: {
      id: row.concertId
    }
  });
}

const onConcertEdit = async (row: any) => {
  editConcertOpt.value = true;
  // 修改演唱会信息
  const res = await getCurrConcertDetails(row.concertId);
  const songsInfo = await listSongItems();
  editConcertReq.value = {
    concertId: res.concertId,
    name: res.name,
    place: res.place,
    maxNum: res.maxNum
  } as EditConcertReq;
  timeInterval.value = [new Date(res.startTime), new Date(res.endTime)];
  const tmp: TransferOption[] = []
  songsInfo.forEach((item: SongInfo) => {
    tmp.push({
      key: item.songId,
      label: item.name,
    } as TransferOption)
  });
  songs.value = tmp;
  // 初始选中
  selectIds.value = res.songInfoVOList.map((item: SongInfo) => item.songId);
}

const editConcertOpt = ref(false);
const editConcertReq = ref({} as EditConcertReq)

const songs = ref<TransferOption[]>([])
const selectIds = ref([]);

const timeInterval = ref<[Date, Date]>()

const filterMethod = (query: string, item: any) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}

const onSubmit = async () => {
  const startTime = timeInterval.value?.[0];
  const endTime = timeInterval.value?.[1];
  // 检查 startTime 和 endTime 是否为有效的 Date 对象
  if (startTime instanceof Date && !isNaN(startTime.getTime()) &&
    endTime instanceof Date && !isNaN(endTime.getTime())) {
    editConcertReq.value.songIdList = selectIds.value;
    const res = await editConcertInfo({ ...editConcertReq.value, startTime, endTime });
    if (res) {
      success("修改成功！")
      editConcertOpt.value = false;
      editConcertReq.value = {} as EditConcertReq;
      await loadDataByPage();
    }
  } else {
    error("无效数据")
  }
}
const onCancel = () => {
  editConcertOpt.value = false;
  editConcertReq.value = {} as EditConcertReq;
}

const disabledDate = (time: Date) => {
  return time.getTime() < Date.now()
}

const doReleaseAlbum = async (row: any) => {
  if (row.isRelease === 1) {
    return;
  }
  const req = {} as ReleaseConcertReq;
  req.concertId = row.concertId;
  const res = await releaseConcert(req);
  if (res) {
    success("发布成功！")
    await loadDataByPage();
  }
}

const doUnReleaseAlbum = async (row: any) => {
  if (row.isRelease === 0) {
    return;
  }
  const req = {} as ReleaseConcertReq;
  req.concertId = row.concertId;
  const res = await unReleaseConcert(req);
  if (res) {
    success("撤销发布成功！")
    await loadDataByPage();
  }
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
      <span class="text-large font-600 mr-3"> 我的演唱会信息 </span>
    </template>
  </el-page-header>
  <el-table :data="concertInfo" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="concertId" label="演唱会序号" width="120" />
    <el-table-column prop="name" label="演唱会名称" width="150" />
    <el-table-column prop="startTime" label="开始时间" width="200" />
    <el-table-column prop="endTime" label="结束时间" width="200" />
    <el-table-column prop="place" label="地点" width="150" />
    <el-table-column prop="maxNum" label="上限人数" width="150" />
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button link type="primary" @click="doGetConcertDetail(scope.$index, scope.row)">详情</el-button>
        <el-button link type="primary" :disabled="!scope.row.canEdit" @click="onConcertEdit(scope.row)">修改</el-button>
        <el-button :icon="Promotion" :disabled="!scope.row.canEdit" v-if="scope.row.isRelease === 1"
          @click="doUnReleaseAlbum(scope.row)" link type="info">撤销发布</el-button>
        <el-button :icon="Promotion" :disabled="!scope.row.canEdit" v-else link type="success"
          @click="doReleaseAlbum(scope.row)">发布</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="60" />
    </template>
  </el-table>
  <el-pagination background :current-page="currPage" layout="prev, pager, next" :total="total" :page-size="15"
    @current-change="onCurrChange" />

  <!-- 修改 -->
  <el-drawer v-model="editConcertOpt" title="修改演唱会信息" direction="rtl" size="80%">
    <el-form :model="editConcertReq" label-width="120px" style="margin-top: 36px; text-align: center">
      <el-form-item label="演唱会名称">
        <el-input v-model="editConcertReq.name" />
      </el-form-item>
      <el-form-item label="时间">
        <div class="block">
          <el-date-picker v-model="timeInterval" type="datetimerange" range-separator="To" start-placeholder="开始时间"
            end-placeholder="结束时间" :disabled-date="disabledDate" />
        </div>
      </el-form-item>
      <el-form-item label="歌曲">
        <el-transfer v-model="selectIds" style="text-align: left;  display: inline-block" :button-texts="['撤销', '选择']"
          :titles="['现有歌曲', '演唱会歌曲']" filterable :filter-method="filterMethod" filter-placeholder="歌名过滤" :data="songs" />
      </el-form-item>
      <el-form-item label="地点">
        <el-input v-model="editConcertReq.place" />
      </el-form-item>
      <el-form-item label="上限人数">
        <el-input-number v-model="editConcertReq.maxNum" :min="10000" :max="300000" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
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

