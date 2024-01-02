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
            <el-col :span="8">
              <el-tag class="top-tag">Top - {{ index + 1 }}</el-tag>
            </el-col>
            <el-col :span="6" class="container">
              <el-button class="btn" @click="goToDetails(album.albumId)" :icon="TopRight" type="info">
                <div>details</div>
              </el-button>
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
  font-size: 30px;
  font-weight: bold;
  /* background: linear-gradient(to right, #00c6ff, #0072ff); */
  -webkit-background-clip: text;
  color: #87c5c2;
  margin-bottom: 20px;
}

.carousel-content {
  padding: 20px;
  background: linear-gradient(#87c5c2, #d4a9b7);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.top-tag {
  position: absolute;
  color: rgba(255, 255, 255, 0.714);
  font-size: 30px;
  font-family: "Comic Sans MS";
  /* font-family: "Kristen ITC"; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0, 0);
  border: 0;
}


.album-info {
  text-align: center;
}

.album-info h3 {
  color: rgba(255, 255, 255, 0.714);
  font-size: 25px;
  font-family: "Comic Sans MS";
  /* font-family: "Kristen ITC"; */
  margin: 10px 0;
}

.band-name {
  color: rgba(255, 255, 255, 0.714);
  font-size: 20px;
  font-family: "Comic Sans MS";
  /* font-family: "Kristen ITC"; */
}

.avg-score {
  color: rgba(255, 255, 255, 0.714);
  font-size: 15px;
  font-family: "Comic Sans MS";
  /* font-family: "Kristen ITC"; */
  margin-top: 8px;
}

.container {
  display: flex;
}

.btn {
  background: rgb(0, 0, 0, 0);
  border: 0;
  color: rgba(255, 255, 255, 0.714);
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-family: "Comic Sans MS";
  /* font-family: "Kristen ITC"; */
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  /* 新增的样式 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  /* 为按钮添加阴影效果 */
  font-weight: bold;
  /* 使按钮中的文字加粗 */
  transition: all 0.3s ease;
  /* 添加过渡效果，使按钮的样式变化更加平滑 */
  width: 100%;
  height: auto;
}

.btn:hover {
  background: #0099cc;
  /* 当鼠标悬停在按钮上时改变背景色 */
}
</style>
