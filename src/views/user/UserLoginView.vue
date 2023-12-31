<script setup lang="ts">
import { ref } from "vue";
import { getCaptcha, accLogin, emailLogin } from "../../service/user/index";
import { success } from "../../utils/common/index";
import { AccLoginParams, EmailLoginParams } from "../../model/user/index";
import { EMAIL_LOGIN_TYPE } from "../../model/enums/index";

import { useRouter } from "vue-router";

const loginType = ref("acc");
const emailPre = ref("");
const emailSuf = ref("@qq.com");

const accLoginParams = ref({} as AccLoginParams);
const emailLoginParams = ref({} as EmailLoginParams);

/**
 * 执行登录
 */
const login = async () => {
  const email = emailPre.value + emailSuf.value;
  let token;
  if (loginType.value === "acc") {
    token = await accLogin(accLoginParams.value);
  } else if (loginType.value === "email") {
    token = await emailLogin({
      ...emailLoginParams.value,
      email,
      loginType: EMAIL_LOGIN_TYPE.PASSWORD_LOGIN,
    });
  } else {
    token = await emailLogin({
      ...emailLoginParams.value,
      email,
      loginType: EMAIL_LOGIN_TYPE.CODE_LOGIN,
    });
  }
  localStorage.setItem("token", token);
  success("登录成功");
  router.push({
    path: "/",
    replace: true
  })
};
/**
 * 获取验证码
 */
const getCaptchaFromBackend = async () => {
  const email = emailPre.value + emailSuf.value;
  await getCaptcha(email);

  disabled.value = true;
  btnText.value = "请稍候...";
  setTimeout(() => {
    doLoop(60);
  }, 500);
};

const disabled = ref(false);
const btnText = ref("获取验证码");

/**
 * 缓冲验证码
 */
const doLoop = (seconds: number) => {
  seconds = seconds ? seconds : 60;
  btnText.value = seconds + "s后获取";
  let countdown = setInterval(() => {
    if (seconds > 0) {
      btnText.value = seconds + "s后获取";
      --seconds;
    } else {
      btnText.value = "获取验证码";
      disabled.value = false;
      clearInterval(countdown);
    }
  }, 1000);
};

const router = useRouter();

const doRegister = () => {
  router.push({
    path: "/register",
    replace: true,
  });
};

const url = "/src/assets/logo.png";
</script>
<!-- <script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // 在这里实现登录逻辑，例如发送一个请求到服务器验证用户名和密码
      console.log('登录按钮被点击或按下回车键');
      console.log('用户名：', this.username);
      console.log('密码：', this.password);
    }
  }
};
</script> -->
<template>
  <div class="custom-container">
    <div>
      <el-form class="login-form" @keyup.enter.native="login">
        <el-image style="width: 100px; height: 100px" :src="url" />
        <h1 class="title">Melody-Epoch</h1>
        <el-tabs v-model="loginType" type="card" class="demo-tabs" stretch>
          <el-tab-pane label="账号登录" name="acc">
            <el-form-item>
              <el-input prefix-icon="user" v-model="accLoginParams.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="lock" v-model="accLoginParams.password" placeholder="请输入密码" type="password"
                show-password>
              </el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="邮箱登录" name="email">
            <el-form-item>
              <el-input prefix-icon="user" v-model="emailPre" placeholder="请输入邮箱">
                <template #append>
                  <el-select v-model="emailSuf" style="width: 115px">
                    <el-option label="@163.com" value="@163.com" />
                    <el-option label="@qq.com" value="@qq.com" />
                    <el-option label="@gmail.com" value="@gmail.com" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="emailLoginParams.password" prefix-icon="lock" placeholder="请输入密码" type="password"
                show-password></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="验证码登录" name="code">
            <el-form-item>
              <el-input prefix-icon="user" v-model="emailPre" placeholder="请输入邮箱">
                <template #append>
                  <el-select v-model="emailSuf" style="width: 115px">
                    <el-option label="@163.com" value="@163.com" />
                    <el-option label="@qq.com" value="@qq.com" />
                    <el-option label="@gmail.com" value="@gmail.com" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="lock" v-model="emailLoginParams.code" placeholder="请输入验证码" class="input-with-select">
                <template #append>
                  <el-button @click="getCaptchaFromBackend" :disabled="disabled">{{ btnText }}</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- <el-tab-pane label="敬请期待" name="code" disabled /> -->
          <el-form-item class="button-container">
            <el-button type="primary" @click="login" size="large" style="width: 400px">立即登录</el-button>
          </el-form-item>
          <el-button @click="doRegister" size="large" text type="success">还没有账号？注册一个</el-button>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
.title {
  font-family: "Comic Sans MS";
  /* font-family: "Kristen ITC"; */
  color: #87c5c2;
}

.custom-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  /* Hide overflow */
}

.demo-tabs {
  justify-content: center;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #0a2759;
  font-size: 32px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}
</style>
