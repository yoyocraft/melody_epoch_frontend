<script setup lang="ts">
import { Setting } from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CurrUserType } from "../model/user/index"
import { getCurrType } from "../service/user/index";

const route = useRoute();
const router = useRouter();

const doSelect = (index: string) => {
  console.log(index);
  router.push({
    path: index,
  });
};

const currUserType = ref({} as CurrUserType);

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
        <el-sub-menu index="/edit-band" v-if="currUserType.isMember">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>乐队操作</span>
          </template>
          <el-menu-item-group v-if="currUserType.isLeader">
            <template #title>队长操作</template>
            <el-menu-item index="/band/edit">修改乐队信息</el-menu-item>
            <el-menu-item index="/band/release">发布乐队信息</el-menu-item>
            <el-menu-item index="/band/part">修改成员信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template #title>成员操作</template>
            <el-menu-item index="/edit-info">修改个人信息</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="/edit-fan" v-if="currUserType.isFan">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>歌迷操作</span>
          </template>
          <el-menu-item index="1-1">修改个人信息</el-menu-item>
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
