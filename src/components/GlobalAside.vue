<script setup lang="ts">
import { Setting } from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CurrUserType } from "../model/user/index"
import { getCurrType } from "../service/user/index";

const route = useRoute();
const router = useRouter();

const doSelect = (index: string) => {
  router.push({
    path: index,
  });
};

const currUserType = ref({
  isAdmin: true,
  isFan: true,
  isLeader: true,
  isMember: true
} as CurrUserType);

onMounted(async () => {
  const res = await getCurrType();
  currUserType.value = res;
})
watch(
  () => route.path,
  async (_, __) => {
    const res = await getCurrType();
    currUserType.value = res;
  }
)

</script>

<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-menu :default-active="route.path" @select="doSelect">
        <el-menu-item index="/">
          <template #title>
            <el-icon>
              <house />
            </el-icon>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="ops-band" v-if="currUserType.isLeader">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>操作</span>
          </template>
          <el-sub-menu index="op-band">
            <template #title><span>乐队</span></template>
            <el-menu-item index="/band/edit">修改乐队信息</el-menu-item>
            <el-menu-item index="/band/release">发布乐队信息</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="op-member">
            <template #title><span>成员</span></template>
            <el-menu-item index="/band/part">修改成员分工</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="op-song">
            <template #title><span>歌曲</span></template>
            <el-menu-item index="/song/add">创建歌曲信息</el-menu-item>
            <el-menu-item index="/song/edit">修改歌曲信息</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="op-album">
            <template #title><span>专辑</span></template>
            <el-menu-item index="/album/add">创建专辑信息</el-menu-item>
            <el-menu-item index="/album/edit">修改专辑信息</el-menu-item>
            <el-menu-item index="/album/song">歌曲录入专辑</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="op-concert">
            <template #title><span>演唱会</span></template>
            <el-menu-item index="/concert/add">创建演唱会信息</el-menu-item>
            <el-menu-item index="/concert/edit">修改演唱会信息</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="ops-fan" v-if="currUserType.isFan">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>操作</span>
          </template>
          <el-menu-item index="/like/songs">喜欢的音乐</el-menu-item>
          <el-menu-item index="/like/album">喜欢的专辑</el-menu-item>
          <el-menu-item index="/like/band">喜欢的乐队</el-menu-item>
          <el-menu-item index="/concert/join">参加的演唱会</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/band">
          <template #title>
            <el-icon>
              <mic />
            </el-icon>
            <span>乐队</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/member">
          <template #title>
            <el-icon>
              <user />
            </el-icon>
            <span>乐队成员</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/album">
          <template #title>
            <el-icon>
              <files />
            </el-icon>
            <span>专辑</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/song">
          <template #title>
            <el-icon><video-play /></el-icon>
            <span>歌曲</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/concert">
          <template #title>
            <el-icon>
              <ticket />
            </el-icon>
            <span>演唱会</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped></style>
