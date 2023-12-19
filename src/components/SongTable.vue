<script setup lang="ts">
import { SongInfo } from '../model/song';

/**
 * 传入的参数
 */
interface Props {
  tableData: SongInfo[];
  doLike?: (row: any) => void;
  doNotLike?: (row: any) => void;
  hasOpt: boolean
}

withDefaults(defineProps<Props>(), {
  tableData: () => [],
  doLike: () => { },
  doNotLike: () => { },
  hasOpt: false
})
</script>

<template>
  <el-table :data="tableData" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="songId" label="歌曲序号" width="150" />
    <el-table-column prop="name" label="歌曲名称" width="150" />
    <el-table-column prop="bandName" label="乐队名称" width="150" />
    <el-table-column prop="author" label="作者" width="150" />
    <el-table-column prop="albumName" label="所属专辑名称" width="150" />
    <el-table-column fixed="right" label="操作" width="150" v-if="hasOpt">
      <template #default="scope">
        <template v-if="scope.row.canLike">
          <el-button link type="warning" v-if="scope.row.isLiked" @click="doNotLike(scope.row)">撤销喜欢</el-button>
          <el-button link type="success" v-else @click="doLike(scope.row)">加入喜欢</el-button>
        </template>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
</template>

<style scoped></style>
