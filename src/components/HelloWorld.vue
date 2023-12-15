<script setup lang="ts">
import { ref } from 'vue';


const comments = ref([{}])

const hideReplyBtn = () => {
  console.log("hideReplyBtn");

}

const inputFocus = () => {
  console.log("inputFocus");

}

const showReplyBtn = () => {
  console.log("showReplyBtn");

}

const onDivInput = (e: any) => {
  console.log(e);

}
const btnShow = () => {
  console.log("btnShow");

}


const sendComment = () => {
  console.log("sendComment");

}

const showReplyInput = () => {
  console.log("showReplyInput");
}

const sendCommentReply = () => { }

const cancelComment = () => { }
</script>

<template>
  尚未完成
  <el-divider style="margin-top: 36px;"></el-divider>
  <el-card>
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="comment">
          <div v-click-outside="hideReplyBtn" @click="inputFocus" class="my-reply mt20">
            <el-avatar class="header-img" :size="40"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <div class="reply-info">
              <div tabindex="0" contenteditable="true" id="replyInput" spellcheck="false" placeholder="输入评论..."
                class="reply-input" @focus="showReplyBtn" @input="onDivInput($event)"></div>
            </div>
            <div class="reply-btn-box" v-show="btnShow">
              <el-button class="reply-btn" @click="sendComment" type="primary">发表评论</el-button>
            </div>
          </div>
          <!-- 评论列表  -->
          <div v-for="(item, i) in comments " :key="1" class="author-title reply-father">
            <el-avatar class="header-img" :size="40"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <div class="author-info">
              <span class="author-name"> 用户昵称 </span>
              <p> 评论内容 </p>
              <span class="author-time">评论时间</span>
            </div>

            <div class="icon-btn">
              <!-- 回复  -->
              <span @click="showReplyInput">
                <el-icon>
                  <ChatSquare />
                </el-icon>
              </span>
            </div>

            <!-- 回复列表 -->
            <div class="reply-box">
              <div v-for="(reply, j) in comments" :key="1" class="author-title">
                <el-avatar class="header-img" :size="40"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <div class="author-info">
                  <span class="author-name">用户昵称</span>
                  <span class="author-time">评论时间</span>
                </div>
                <div class="talk-box">
                  <span class="reply"> 评论内容 </span>
                </div>
                <div class="reply-box"></div>
              </div>
            </div>
            <!-- 设置展示条件 -->
            <div v-show="true" class=" my-reply my-comment-reply">
              <el-avatar class="header-img" :size="40"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <div class="reply-info">
                <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="请友好发言"
                  @input="onDivInput($event)" class="reply-input reply-comment-input"></div>
              </div>
              <div class="reply-btn-box">
                <el-button class="reply-btn" @click="sendCommentReply" type="primary">发表评论</el-button>
                <el-button class="reply-btn" @click="cancelComment">取消</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.mt20 {
  margin-top: 20px;
}

.comment {
  font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei,
    sans-serif;
}

.my-reply {
  padding: 10px;
  background-color: #fafbfc;
}

.my-reply .header-img {
  display: inline-block;
  vertical-align: top;
}

.my-reply .reply-info {
  display: inline-block;
  margin-left: 5px;
  width: 90%;
}

@media screen and (max-width: 1200px) {
  .my-reply .reply-info {
    width: 80%;
  }
}

.my-reply .reply-info .reply-input {
  min-height: 20px;
  line-height: 22px;
  padding: 10px 10px;
  color: #666;
  background-color: #fff;
  border-radius: 5px;
}

.my-reply .reply-info .reply-input:empty:before {
  content: attr(placeholder);
}

.my-reply .reply-info .reply-input:focus:before {
  content: none;
}

.my-reply .reply-info .reply-input:focus {
  padding: 8px 8px;
  border: 2px solid #409eff;
  box-shadow: none;
  outline: none;
}

.my-reply .reply-btn-box {
  height: 25px;
  margin: 10px 0;
}

.my-reply .reply-btn-box .reply-btn {
  position: relative;
  float: right;
  margin-right: 15px;
}

.my-comment-reply {
  margin-left: 50px;
}

.my-comment-reply .reply-input {
  width: flex;
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}

.author-title {
  padding: 10px;
}

.author-title .header-img {
  display: inline-block;
  vertical-align: top;
}

.author-title .author-info {
  display: inline-block;
  margin-left: 5px;
  width: 60%;
  height: 40px;
  line-height: 20px;
}

.author-title .author-info .author-name {
  color: #303133;
  font-size: 18px;
  font-weight: 500;
}

.reply-box .talk-box {
  color: #606266;
}

.reply-box .talk-box span {
  color: #6298ce;
}

.author-title .author-info .author-time {
  font-size: 14px;
}

.author-time {
  color: #606266;
}

.author-title .icon-btn {
  width: 30%;
  padding: 0 !important;
  float: right;
}

@media screen and (max-width: 1200px) {
  .author-title .icon-btn {
    width: 20%;
    padding: 7px;
  }
}

.author-title .icon-btn>span {
  cursor: pointer;
}

.author-title .icon-btn .iconfont {
  margin: 0 5px;
}

.author-title .talk-box {
  margin: 0 50px;
}

.author-title .talk-box>p {
  margin: 0;
}

.author-title .talk-box .reply {
  font-size: 16px;
  color: #606266;
}

.author-title .reply-box {
  margin: 10px 0 0 50px;
  background-color: #efefef;
}

.author-name {
  padding: 0 6px;
  display: inline-block !important;
}

.author {
  background: #ffba00;
  border-radius: 2px;
  display: inline-block;
  width: 40px;
  text-align: center;
  color: #fff;
}
</style>
