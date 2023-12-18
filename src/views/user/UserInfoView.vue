<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { EditUserReq, UserInfo } from '../../model/user';
import { GENDER_MAP, formatDate } from "../../utils/index"
import { ArrowRightBold } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { bindEmail, editUserInfo, getCaptcha, getCurrUser } from "../../service/user/index";
import { BindEmailReq } from "../../model/user/index";
import { error, success } from '../../service/common';
import { EditMemberReq } from '../../model/member';
import { EditFanReq } from '../../model/fan';

const router = useRouter();
const bindEmailOpt = ref(false)
const editMemberInfoOpt = ref(false)
const editFanInfoOpt = ref(false)

const editUserReq = ref({} as EditUserReq);
const editMemberReq = ref({} as EditMemberReq);
const editFanReq = ref({} as EditFanReq)

const bindEmailReq = ref({} as BindEmailReq)

const emailPre = ref("");
const emailSuf = ref("@qq.com");

const disabled = ref(false);
const btnText = ref("获取验证码");

const onBindEmailSubmit = async () => {
  const email = emailPre.value + emailSuf.value;
  bindEmailReq.value.email = email;
  const res = await bindEmail(bindEmailReq.value);
  if (res) {
    success("绑定成功")
    await loadData();
    bindEmailOpt.value = false;
    emailPre.value = "";
    bindEmailReq.value = {} as BindEmailReq;
  }
}
const onBindEmailCancel = async () => {
  bindEmailOpt.value = false;
  emailPre.value = "";
  bindEmailReq.value = {} as BindEmailReq;
}

const getCaptchaFromBackend = async () => {
  const email = emailPre.value + emailSuf.value;
  await getCaptcha(email);

  disabled.value = true;
  btnText.value = "请稍候...";
  setTimeout(() => {
    doLoop(60);
  }, 500);
};

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

const doBandDetail = (bandId: number) => {
  if (bandId === null) {
    error("当前尚未加入乐队！")
    return;
  }
  router.push({
    path: "/band/info",
    query: {
      id: bandId
    }
  })
}
const bindText = ref("绑定邮箱！")

const loadData = async () => {
  const res = await getCurrUser();
  if (res.type == 2) {
    res.memberInfoVO.joinTime = res.memberInfoVO.joinTime ? formatDate(res.memberInfoVO.joinTime) : " - ";
    res.memberInfoVO.part = res.memberInfoVO.part ?? " - ";
    res.memberInfoVO.bandName = res.memberInfoVO.bandName ?? " - ";
  }
  userInfo.value = res;
  bindText.value = userInfo.value.email ?  "换绑邮箱" : "绑定邮箱";
}

onMounted(async () => {
  await loadData();
})

const userInfo = ref({} as UserInfo);

const goBack = () => {
  router.back();
}

const genderOptions = [
  {
    value: 1,
    label: '男',
  },
  {
    value: 0,
    label: '女',
  },
]

const onMemberEditSubmit = async () => {
  editUserReq.value.userId = userInfo.value.userId;
  editUserReq.value.type = userInfo.value.type;
  editMemberReq.value.memberId = userInfo.value.userId;
  editUserReq.value.editMemberReq = editMemberReq.value;
  const res = await editUserInfo(editUserReq.value);
  if (res) {
    success("修改成功！")
    editMemberInfoOpt.value = false;
    await loadData();
  }
}

const onMemberEditCancel = () => {
  editMemberInfoOpt.value = false;
  editUserReq.value = {} as EditUserReq;
}

const onFanEditSubmit = async () => {
  editUserReq.value.userId = userInfo.value.userId;
  editUserReq.value.type = userInfo.value.type;
  editFanReq.value.fanId = userInfo.value.userId;
  editUserReq.value.editFanReq = editFanReq.value;
  const res = await editUserInfo(editUserReq.value);
  if (res) {
    success("修改成功！")
    editFanInfoOpt.value = false;
    await loadData();
  }
}

const onFanEditCancel = () => {
  editFanInfoOpt.value = false;
  editUserReq.value = {} as EditUserReq;
}

const doEditMemberInfo = () => {
  editMemberInfoOpt.value = true;
  editUserReq.value.nickname = userInfo.value.nickname;
  editMemberReq.value = { ...userInfo.value.memberInfoVO } as EditMemberReq;
}

const doEditFanInfo = () => {
  editFanInfoOpt.value = true;
  editUserReq.value.nickname = userInfo.value.nickname;
  editFanReq.value = { ...userInfo.value.fanInfoVO } as EditFanReq;
}


</script>

<template>
  <el-page-header @back="goBack" style="margin-bottom: 36px;">
    <template #content>
      <span class="text-large font-600 mr-3"> 个人信息 </span>
    </template>
  </el-page-header>
  <el-form label-width="120px" label-position="right">
    <el-form-item label="uid">
      <el-input disabled v-model="userInfo.userId" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input disabled v-model="userInfo.email">
        <template #append>
          <el-button @click="bindEmailOpt = true">
            <span>{{ bindText }}</span>
            <el-icon>
              <ArrowRightBold />
            </el-icon>
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <template v-if="userInfo.type == 2">
      <!-- 乐队成员 -->
      <el-form-item label="姓名">
        <el-input disabled v-model="userInfo.memberInfoVO.name">
          <template #append>
            <el-button @click="doEditMemberInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input disabled v-model="GENDER_MAP[userInfo.memberInfoVO.gender]">
          <template #append>
            <el-button @click="doEditMemberInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input disabled v-model="userInfo.memberInfoVO.age">
          <template #append>
            <el-button @click="doEditMemberInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input disabled v-model="userInfo.nickname">
          <template #append>
            <el-button @click="doEditMemberInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="所在乐队">
        <el-input disabled v-model="userInfo.memberInfoVO.bandName">
          <template #append>
            <el-button @click="doBandDetail(userInfo.memberInfoVO.bandId)">
              <span>乐队详细信息</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="乐队分工">
        <el-input disabled v-model="userInfo.memberInfoVO.part" />
      </el-form-item>
      <el-form-item label="加入时间">
        <el-input disabled v-model="userInfo.memberInfoVO.joinTime" />
      </el-form-item>
    </template>
    <template v-else-if="userInfo.type == 3">
      <!-- 乐迷 -->
      <el-form-item label="姓名">
        <el-input disabled v-model="userInfo.fanInfoVO.name">
          <template #append>
            <el-button @click="doEditFanInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input disabled v-model="GENDER_MAP[userInfo.fanInfoVO.gender]">
          <template #append>
            <el-button @click="doEditFanInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input disabled v-model="userInfo.nickname">
          <template #append>
            <el-button @click="doEditFanInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input disabled v-model="userInfo.fanInfoVO.age">
          <template #append>
            <el-button @click="doEditFanInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="职业">
        <el-input disabled v-model="userInfo.fanInfoVO.career">
          <template #append>
            <el-button @click="doEditFanInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="学历">
        <el-input disabled v-model="userInfo.fanInfoVO.education">
          <template #append>
            <el-button @click="doEditFanInfo">
              <span>修改</span>
              <el-icon>
                <ArrowRightBold />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </template>
  </el-form>


  <el-drawer v-model="bindEmailOpt" :title="bindText" direction="btt" size="60%">
    <el-form class="info-form">
      <el-form-item>
        <el-input prefix-icon="user" v-model="emailPre" placeholder="请输入邮箱">
          <template #append>
            <el-select v-model="emailSuf" style="width: 120px">
              <el-option label="@163.com" value="@163.com" />
              <el-option label="@qq.com" value="@qq.com" />
              <el-option label="@gmail.com" value="@gmail.com" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="lock" v-model="bindEmailReq.code" placeholder="请输入验证码">
          <template #append>
            <el-button style="width: 120px" @click="getCaptchaFromBackend" :disabled="disabled">
              {{ btnText }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onBindEmailSubmit">绑定</el-button>
        <el-button @click="onBindEmailCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-drawer v-model="editMemberInfoOpt" title="修改乐队成员信息" direction="rtl" size="80%" :with-header="false">
    <!-- 修改昵称等信息 -->
    <el-form label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="editMemberReq.name" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="editUserReq.nickname" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="editMemberReq.gender" class="m-2" placeholder="选择性别" size="large">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="editMemberReq.age" :min="1" :max="120" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onMemberEditSubmit">修改</el-button>
        <el-button @click="onMemberEditCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>


  <el-drawer v-model="editFanInfoOpt" title="修改个人信息" direction="rtl" size="80%" :with-header="false">
    <!-- 修改昵称等信息 -->
    <el-form label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="editFanReq.name" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="editUserReq.nickname" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="editFanReq.gender" class="m-2" placeholder="选择性别" size="large">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="editFanReq.age" :min="1" :max="120" />
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="editFanReq.career" />
      </el-form-item>
      <el-form-item label="学历">
        <el-input v-model="editFanReq.education" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onFanEditSubmit">修改</el-button>
        <el-button @click="onFanEditCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>



<style scoped>
.info-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;
}
</style>
