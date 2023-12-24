<script setup lang="ts">
import { Files, House, Mic, Setting, Ticket, User, VideoPlay, View, Hide } from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserAuthType } from "../model/user/index"
import { getAuthType } from "../service/user/index";

const route = useRoute();
const router = useRouter();

const isCollapse = ref(false);

const doSelect = (index: string) => {
  router.push({
    path: index,
  });
};

const currUserType = ref({} as UserAuthType);

onMounted(async () => {
  const res = await getAuthType();
  currUserType.value = res;
})
watch(
  () => route.path,
  async (_, __) => {
    const res = await getAuthType();
    currUserType.value = res;
  }
)

</script>

<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-switch v-model="isCollapse" class="ml-2" inline-prompt active-text="展开" inactive-text="缩略"
        style="--el-switch-on-color: #107bac; --el-switch-off-color: #107bac" :active-action-icon="View"
        :inactive-action-icon="Hide" />
      <el-menu :default-active="route.path ?? '/'" @select="doSelect" :collapse="isCollapse">
        <el-menu-item index="/">
          <el-icon>
            <House />
          </el-icon>
          <template #title>
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
            <template #title>
              <el-icon>
                <Mic />
              </el-icon>
              <span>乐队</span>
            </template>
            <el-menu-item index="/band/curr">
              <el-icon>
                <Promotion />
              </el-icon>
              <span>我的乐队信息</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="op-member">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>乐队成员</span>
            </template>
            <el-menu-item index="/band/part">
              <el-icon>
                <Edit />
              </el-icon>
              <span>修改成员分工</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="op-song">
            <template #title>
              <el-icon>
                <VideoPlay />
              </el-icon>
              <span>歌曲</span>
            </template>
            <el-menu-item index="/song/add">
              <el-icon>
                <CirclePlus />
              </el-icon>
              <span>创建歌曲信息</span>
            </el-menu-item>
            <el-menu-item index="/song/curr">
              <el-icon>
                <VideoPlay />
              </el-icon>
              <span>我的歌曲信息</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="op-album">
            <template #title>
              <el-icon>
                <Files />
              </el-icon>
              <span>专辑</span>
            </template>
            <el-menu-item index="/album/add">
              <el-icon>
                <CirclePlus />
              </el-icon>
              <span>创建专辑信息</span>
            </el-menu-item>
            <el-menu-item index="/album/curr">
              <el-icon>
                <Files />
              </el-icon>
              <span>我的专辑信息</span>
            </el-menu-item>
            <el-menu-item index="/album/song">
              <el-icon>
                <Edit />
              </el-icon>
              <span>歌曲录入专辑</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="op-concert">
            <template #title>
              <el-icon>
                <Ticket />
              </el-icon>
              <span>演唱会</span>
            </template>
            <el-menu-item index="/concert/add">
              <el-icon>
                <CirclePlus />
              </el-icon>
              <span>创建演唱会信息</span>
            </el-menu-item>
            <el-menu-item index="/concert/curr">
              <el-icon>
                <Ticket />
              </el-icon>
              <span>我的演唱会信息</span>
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="ops-fan" v-if="currUserType.isFan">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>操作</span>
          </template>
          <el-menu-item index="/like/band">
            <el-icon>
              <Star />
            </el-icon>
            <span>喜欢的乐队</span>
          </el-menu-item>
          <el-menu-item index="/like/album">
            <el-icon>
              <Star />
            </el-icon>
            <span>喜欢的专辑</span>
          </el-menu-item>
          <el-menu-item index="/like/song">
            <el-icon>
              <Star />
            </el-icon>
            <span>喜欢的音乐</span>
          </el-menu-item>
          <el-menu-item index="/joined/concert">
            <el-icon>
              <Star />
            </el-icon>
            <span>参加的演唱会</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/band">
          <el-icon>
            <Mic />
          </el-icon>
          <template #title>
            <span>乐队</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/member">
          <el-icon>
            <User />
          </el-icon>
          <template #title>
            <span>乐队成员</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/album">
          <el-icon>
            <Files />
          </el-icon>
          <template #title>
            <span>专辑</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/song">
          <el-icon>
            <VideoPlay />
          </el-icon>
          <template #title>
            <span>歌曲</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/concert">
          <el-icon>
            <Ticket />
          </el-icon>
          <template #title>
            <span>演唱会</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped></style>
