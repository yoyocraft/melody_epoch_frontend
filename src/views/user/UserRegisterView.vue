<script setup lang="ts">
import { ref } from "vue";
import {
  getCaptcha,
  accRegister,
  emailRegister,
} from "../../service/user/index";
import { useRouter } from "vue-router";
import { USER_ROLE_TYPE } from "../../model/enums/index";
import { success } from "../../service/common";

const account = ref("");
const password = ref("");
const checkedPassword = ref("");
const regType = ref("acc");
const emailPre = ref("");
const emailSuf = ref("@qq.com");
const code = ref("");

const role = ref(USER_ROLE_TYPE.MEMBER);

const userRoles = [
  {
    value: USER_ROLE_TYPE.MEMBER,
    label: "乐队成员",
  },
  {
    value: USER_ROLE_TYPE.FAN,
    label: "乐迷",
  },
];

/**
 * 执行登录
 */
const register = async () => {
  const email = emailPre.value + emailSuf.value;
  if (regType.value === "acc") {
    const res = await accRegister(
      account.value,
      password.value,
      checkedPassword.value,
      role.value,
    );
    if (res) {
      success("注册成功");
    }
  } else if (regType.value === "email") {
    const res = await emailRegister(
      email,
      password.value,
      checkedPassword.value,
      code.value,
      role.value,
    );
    if (res) {
      success("注册成功");
    }
  }
  router.push({
    path: "/login",
    replace: true,
  });
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

const doLogin = () => {
  router.push({
    path: "/login",
    replace: true,
  });
};
</script>

<template>
  <div class="custom-container">
    <div>
      <h1>Melody-Epoch</h1>
      <el-form class="register-form">
        <el-tabs v-model="regType" type="card" class="demo-tabs">
          <el-tab-pane label="账号注册" name="acc">
            <el-form-item>
              <el-input v-model="account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="password"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="checkedPassword"
                placeholder="请再次输入密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <strong style="margin-right: 16px">选择角色</strong>
              <el-select v-model="role" class="m-2" placeholder="Select">
                <el-option
                  v-for="item in userRoles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="邮箱注册" name="email">
            <el-form-item>
              <el-input v-model="emailPre" placeholder="请输入邮箱">
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
              <el-input
                v-model="password"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="checkedPassword"
                placeholder="请再次输入密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="code"
                placeholder="请输入验证码"
                class="input-with-select"
              >
                <template #append>
                  <el-button
                    @click="getCaptchaFromBackend"
                    :disabled="disabled"
                    >{{ btnText }}</el-button
                  >
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <strong style="margin-right: 16px">选择角色</strong>
              <el-select v-model="role" class="m-2" placeholder="Select">
                <el-option
                  v-for="item in userRoles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="敬请期待" name="code" disabled />
          <el-form-item class="button-container">
            <el-button
              type="primary"
              @click="register"
              size="large"
              style="width: 400px"
              >立即注册</el-button
            >
          </el-form-item>
          <el-button
            text
            @click="doLogin"
            style="color: #36318d"
            class="float-right"
            >已经有账号了？去登录</el-button
          >
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.custom-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.demo-tabs {
  justify-content: center;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #0a2759;
  font-size: 32px;
  font-weight: 600;
}
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.float-right {
  display: block;
  margin-left: 13px;
  overflow: hidden;
  text-align: right;
  margin-right: 10px;
}
</style>
