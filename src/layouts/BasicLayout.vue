<script setup lang="ts">
import GlobalAside from "../components/GlobalAside.vue";
import GlobalHeader from "../components/GlobalHeader.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <GlobalHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <GlobalAside />
        </el-aside>
        <el-container>
          <el-main><router-view /></el-main>
          <el-footer style="background-color: aliceblue;">
            <a href="https://codejuzi.icu" target="_blank">
              @2023 CodeJuzi出品 </a>
          </el-footer>
        </el-container>

      </el-container>
    </el-container>
  </div>
</template>

<style>
.common-layout {
  height: 100vh;
}

.el-container {
  height: 100%;
}

.el-footer {
  background-color: #e6ecf5;
  text-align: center;
  line-height: 60px;
}
</style>
