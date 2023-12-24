<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TopAlbumVO } from '../model/album';
import { getTopAlbums } from '../service/album';
import { TopRight } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const topAlbums = ref<TopAlbumVO[]>([]);
const router = useRouter();

const loadData = async () => {
  const res = await getTopAlbums();
  if (res) {
    topAlbums.value = res;
  }
}

onMounted(async () => {
  await loadData();
})

const goToDetails = (albumId: number) => {
  console.log(albumId);
  router.push({
    path: "/album/info",
    query: {
      id: albumId
    }
  })
}
</script>

<template>
  <div>
    <h2 class="page-title">Top Albums</h2>
    <el-carousel v-if="topAlbums.length > 0" :interval="4000" type="card" height="350px">
      <el-carousel-item v-for="(album, index) in topAlbums" :key="album.albumId">
        <div class="carousel-content">
          <el-row :gutter="20" justify="space-between">
            <el-col :span="6">
              <el-tag class="top-tag">Top - {{ index + 1 }}</el-tag>
            </el-col>
            <el-col :span="6">
              <el-button @click="goToDetails(album.albumId)" :icon="TopRight" type="info">查看详情</el-button>
            </el-col>
          </el-row>
          <el-divider style="margin-top: 8px;" />
          <div class="album-info">
            <h3>{{ album.name }}</h3>
            <p class="band-name">{{ album.bandName }}</p>
            <p class="avg-score">Average Score: {{ album.avgScore }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div v-else>
      <el-skeleton :rows="5" animated />
    </div>
  </div>
</template>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.carousel-content {
  padding: 20px;
  background-color: #88b9c7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.top-tag {
  margin-right: 8px;
  font-size: 16px;
}

.album-info {
  text-align: center;
}

.album-info h3 {
  color: #333;
  font-size: 20px;
  margin: 10px 0;
}

.band-name {
  color: #d40d0d;
}

.avg-score {
  color: #e55406;
  font-size: 14px;
  margin-top: 8px;
}
</style>


