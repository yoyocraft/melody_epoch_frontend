<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { SongItem } from "../../model/song/index"
import { Album, SongToAlbumReq } from "../../model/album/index"
import { currBandAllAlbums, addSongsToAlbum } from "../../service/album/index"
import { listSongToAlbum } from "../../service/song/index"
import { TransferOption } from '../../model/common';
import { success } from '../../service/common';

const router = useRouter();
import { InfoFilled } from '@element-plus/icons-vue'

const albumSelect = ref()
const albumOptions = ref<Album[]>([])

onMounted(async () => {
  albumOptions.value = await currBandAllAlbums();
})


const noneSelectedSongs = ref<TransferOption[]>([])
const selectIds = ref<number[]>([]);
const filterMethod = (query: string, item: any) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}

const onSubmit = async () => {
  const req = {} as SongToAlbumReq;
  req.albumId = albumSelect.value;
  req.selectedSongIds = selectIds.value;
  const additionalKeys: number[] = noneSelectedSongs.value
    .filter((song) => !selectIds.value.includes(song.key))
    .map((song) => song.key);
  req.noneSelectedSongIds = additionalKeys;
  const res = await addSongsToAlbum(req);
  if (res) {
    success("录入成功")
    router.push({
      path: "/album/song",
      replace: true
    })
  }
}

const onReset = () => {
  noneSelectedSongs.value = originalNoneAlbumSongs
  selectIds.value = originalSelectedSongs;
}

const goBack = () => {
  router.back();
}

let originalNoneAlbumSongs: TransferOption[] = []
let originalSelectedSongs: number[] = []


const doOnSelect = async () => {
  const res = await listSongToAlbum(albumSelect.value);
  const noneSelect: TransferOption[] = []
  const selected: number[] = []
  res.noneAlbumSongs.forEach((item: SongItem) => {
    noneSelect.push({
      key: item.songId,
      label: item.name,
    } as TransferOption)
  })
  res.albumSongs.forEach((item: SongItem) => {
    selected.push(item.songId);
  })

  originalNoneAlbumSongs = noneSelect;
  originalSelectedSongs = selected;
  noneSelectedSongs.value = originalNoneAlbumSongs
  selectIds.value = originalSelectedSongs;
}


</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 歌曲录入专辑 </span>
    </template>
  </el-page-header>
  <el-form label-width="120px" style="margin-top: 36px;">
    <el-form-item label="专辑名称">
      <el-select v-model="albumSelect" class="m-2" placeholder="请选择要录入的专辑" @change="doOnSelect">
        <el-option v-for="item in albumOptions" :key="item.albumId" :label="item.name" :value="item.albumId" />
      </el-select>
    </el-form-item>

    <el-form-item label="歌曲">
      <el-transfer v-model="selectIds" style="text-align: left;  display: inline-block" :button-texts="['撤销', '选择']"
        :titles="['未录入歌曲', '待录入歌曲']" :right-default-checked="originalSelectedSongs" filterable
        :filter-method="filterMethod" filter-placeholder="歌名过滤" :data="noneSelectedSongs" />
    </el-form-item>
    <el-form-item>
      <el-popconfirm width="250" @confirm="onSubmit" confirm-button-text="确认" cancel-button-text="再想想" :icon="InfoFilled"
        icon-color="#626AEF" title="注意一旦录入，不能录出">
        <template #reference>
          <el-button type="primary">录入</el-button>
        </template>
      </el-popconfirm>
      <el-button type="info" @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>


