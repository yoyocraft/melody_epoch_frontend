<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ConcertAddReq } from "../../model/concert/index"
import { addConcert } from "../../service/concert/index"
import { listSongItems } from "../../service/song/index"
import { SongItem } from "../../model/song/index"
import { TransferOption } from "../../model/common/index"
import { error, success } from '../../utils/common';
import { useRouter } from 'vue-router';

const concertAddReq = ref({} as ConcertAddReq)
const timeInterval = ref<[Date, Date]>()
const router = useRouter();

const onSubmit = async () => {
  const tmpIds: number[] = []
  selectIds.value.forEach(ids => {
    tmpIds.push(ids)
  })

  concertAddReq.value.songIdList = tmpIds;
  const startTime = timeInterval.value?.[0];
  const endTime = timeInterval.value?.[1];

  // 检查 startTime 和 endTime 是否为有效的 Date 对象
  if (startTime instanceof Date && !isNaN(startTime.getTime()) &&
    endTime instanceof Date && !isNaN(endTime.getTime())) {
    const res = await addConcert({
      ...concertAddReq.value,
      startTime,
      endTime
    });
    if (res.data) {
      success("创建成功")
    }
    router.push({
      path: "/concert/curr",
      replace: true
    })
  } else {
    error("无效数据")
  }
}
const onReset = () => {
  concertAddReq.value = {} as ConcertAddReq;
}

const songs = ref<TransferOption[]>([])
const selectIds = ref([]);
onMounted(async () => {
  const res = await listSongItems();
  const tmp: TransferOption[] = []
  res.forEach((songItem: SongItem) => {
    tmp.push({
      key: songItem.songId,
      label: songItem.name,
    } as TransferOption)
  });
  songs.value = tmp
})

const filterMethod = (query: string, item: any) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}

const goBack = () => {
  router.back();
}

const disabledDate = (time: Date) => {
  return time.getTime() < Date.now()
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 填写演唱会信息 </span>
    </template>

  </el-page-header>

  <el-form :model="concertAddReq" label-width="120px" style="margin-top: 36px; text-align: center">
    <el-form-item label="演唱会名称">
      <el-input v-model="concertAddReq.name" />
    </el-form-item>
    <el-form-item label="时间" class="block">
      <div>
        <el-date-picker v-model="timeInterval" type="datetimerange" range-separator="To" start-placeholder="开始时间"
          end-placeholder="结束时间" :disabled-date="disabledDate" />
      </div>
    </el-form-item>
    <el-form-item label="歌曲">
      <el-transfer v-model="selectIds" style="text-align: left;  display: inline-block" :button-texts="['撤销', '选择']"
        :titles="['现有歌曲', '演唱会歌曲']" filterable :filter-method="filterMethod" filter-placeholder="歌名过滤" :data="songs" />
    </el-form-item>
    <el-form-item label="地点">
      <el-input v-model="concertAddReq.place" />
    </el-form-item>
    <el-form-item label="上限人数">
      <el-input-number v-model="concertAddReq.maxNum" :min="10000" :max="300000" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button type="info" @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.block {
  display: flex;
  justify-content: space-between;
}
</style>

