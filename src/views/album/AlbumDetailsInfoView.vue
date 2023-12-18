<script setup lang="ts">
import { Files } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AlbumDetailsVO } from '../../model/album/index'
import { AddCommentReq, CommentVO } from '../../model/comment/index'
import { getAlbumDetailsInfo } from '../../service/album/index'
import { getLikeAlbumStatus, like, scoreAlbum, unlike } from '../../service/fan/index'
import { addComment } from '../../service/comment/index'
import { error, success } from '../../service/common';
import { formatDate, formatCommentCreateTimes, LIKE_TYPE_MAP } from '../../utils';
import { ElMessage } from 'element-plus'
import { LikeAlbumStatus, LikeReq, ScoreAlbumReq } from '../../model/fan';


const router = useRouter();
const route = useRoute();
const goBack = () => {
  router.back();
}
const addCommentReq = ref({} as AddCommentReq)
let currAlbumId: number = 0;
const newCommentContent = ref("");

const loadData = async () => {
  const albumId = route.query?.id;
  if (typeof albumId === "string") {
    const id = parseInt(albumId, 10);
    if (!isNaN(id)) {
      currAlbumId = id;
      const res = await getAlbumDetailsInfo(id);
      res.releaseTime = formatDate(res.releaseTime);
      res.commentVOList?.forEach((item: CommentVO) => {
        formatCommentCreateTimes(item);
      });
      albumInfo.value = res;
    } else {
      error("非法信息！");
    }
  } else {
    error("非法信息！");
  }
}

const likeStatus = ref({} as LikeAlbumStatus)
const loadLikeStatus = async () => {
  const albumId = route.query?.id;
  if (typeof albumId === "string") {
    const id = parseInt(albumId, 10);
    if (!isNaN(id)) {
      currAlbumId = id;
      const res = await getLikeAlbumStatus(id);
      likeStatus.value = res;
    } else {
      error("非法信息！");
    }
  } else {
    error("非法信息！");
  }
}

onMounted(async () => {
  await loadData();
  await loadLikeStatus();
})

const albumInfo = ref({} as AlbumDetailsVO)
const commentUserId = ref();


const showCommentInput = (item: CommentVO, reply: CommentVO) => {
  addCommentReq.value.content = "@" + reply.userName + " "
  addCommentReq.value.parentId = reply.commentId;
  commentUserId.value = item.userId;
}

const cancel = () => {
  addCommentReq.value = {} as AddCommentReq;
}

const commitComment = async () => {
  addCommentReq.value.albumId = currAlbumId;
  const res = await addComment(addCommentReq.value);
  if (res) {
    success("评论成功！")
    await loadData();
    // 清空数据
    addCommentReq.value = {} as AddCommentReq;
    commentUserId.value = 0;
    newCommentContent.value = "";
  }
}

const addNewComment = async () => {
  addCommentReq.value.albumId = currAlbumId;
  addCommentReq.value.content = newCommentContent.value;
  const res = await addComment(addCommentReq.value);
  if (res) {
    success("评论成功！")
    await loadData();
    // 清空数据
    addCommentReq.value = {} as AddCommentReq;
    commentUserId.value = 0;
    newCommentContent.value = "";
  }
}
const score = ref(5);
const dialogFormVisible = ref(false)

const doLike = async () => {
  const req = {} as LikeReq;
  req.likeId = currAlbumId;
  req.type = LIKE_TYPE_MAP.LIKE_ALBUM;
  const res = await like(req);
  if (res) {
    success("喜欢成功！")
    await loadLikeStatus();
  }
}

const doNotLike = async () => {
  const req = {} as LikeReq;
  req.likeId = currAlbumId;
  req.type = LIKE_TYPE_MAP.LIKE_ALBUM;
  const res = await unlike(req);
  if (res) {
    success("撤销喜欢成功！")
    await loadLikeStatus();
  }
}
const doScore = async () => {
  dialogFormVisible.value = false;
  const req = {} as ScoreAlbumReq;
  req.score = score.value;
  req.albumId = currAlbumId;
  const res = await scoreAlbum(req);
  if (res) {
    success("打分成功")
  }
}
const doCancel = () => {
  dialogFormVisible.value = false;
  score.value = 5;
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 专辑详细信息 </span>
    </template>
    <template #extra>
      <div class="flex items-center" v-if="likeStatus.canLike">
        <el-button type="primary" size="large" class="ml-2" v-if="likeStatus.isLiked && !likeStatus.isScored"
          @click="dialogFormVisible = true">为它打分</el-button>
        <el-button type="warning" size="large" class="ml-2" v-if="likeStatus.isLiked" @click="doNotLike">撤销喜欢</el-button>
        <el-button type="success" size="large" class="ml-2" v-else @click="doLike">喜欢</el-button>
      </div>
    </template>
  </el-page-header>

  <el-dialog v-model="dialogFormVisible" title="给你喜欢的专辑打分吧">
    <el-form>
      <el-form-item label="分值" label-width="150px">
        <el-rate v-model="score" allow-half size="large" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="doCancel">取消</el-button>
        <el-button type="primary" @click="doScore">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>


  <el-divider style="margin-top: 36px; margin-bottom: 36px;">
    <el-icon>
      <Files />
    </el-icon>
    <span style="font-size: 25px"> 专辑信息 </span>
  </el-divider>

  <el-form :model="albumInfo" label-width="120px" style="margin-top: 16px; text-align: center">
    <el-form-item label="专辑序号">
      <el-input disabled v-model="albumInfo.albumId" />
    </el-form-item>
    <el-form-item label="专辑名称">
      <el-input disabled v-model="albumInfo.name" />
    </el-form-item>
    <el-form-item label="发行公司">
      <el-input disabled v-model="albumInfo.company" />
    </el-form-item>
    <el-form-item label="乐队名称">
      <el-input disabled v-model="albumInfo.bandName" />
    </el-form-item>
    <el-form-item label="专辑简介">
      <el-input disabled v-model="albumInfo.profile" />
    </el-form-item>
    <el-form-item label="专辑评分">
      <el-input disabled v-model="albumInfo.avgScore" />
    </el-form-item>
  </el-form>

  <el-divider style="margin-top: 36px">
    <el-icon><video-play /></el-icon>
    <span style="font-size: 20px"> 歌曲信息</span>
  </el-divider>

  <div class="table-center">
    <el-table :data="albumInfo.songInfoList" style="width: 100%" max-height="250">
      <el-table-column fixed prop="songId" label="歌曲序号" width="150" />
      <el-table-column prop="name" label="歌曲名" width="120" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="albumName" label="所属专辑" width="120" />
      <template #empty>
        <el-empty :image-size="60" />
      </template>
    </el-table>
  </div>

  <el-divider style="margin-top: 36px">
    <el-icon>
      <ChatSquare />
    </el-icon>
    <span style="font-size: 20px"> 评论信息</span>
  </el-divider>

  <div class="container">
    <el-row style="margin-top: 16px;">
      <el-col :span="24">
        <el-card shadow="hover">
          <el-input v-model="newCommentContent" maxlength="250" show-word-limit :autosize="{ minRows: 2, maxRows: 6 }"
            type="textarea" placeholder="添加新评论" autofocus />
          <template #footer style="float: right;">
            <el-button @click="cancel" round>取消</el-button>
            <el-button style="margin-left: 36px;" type="success" round @click="addNewComment">确定</el-button>
          </template>
        </el-card>
      </el-col>
    </el-row>
    <div class="comment" v-for="item in albumInfo.commentVOList">
      <div class="info">
        <img class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" width="36"
          height="36" />
        <div class="right">
          <div class="name">{{ item.userName }}</div>
          <div class="date">{{ item.createTime }}</div>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="control">
        <span class="comment-reply" @click="showCommentInput(item, item)">
          <el-icon>
            <Comment />
          </el-icon>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div class="item" v-for="reply in item.childrenComments">
          <div class="reply-content">
            <span class="from-name">{{ reply.userName }}</span><span>: </span>
            <span class="to-name">@{{ item.userName }}</span>
            <span>{{ reply.content }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ reply.createTime }}</span>
            <span class="reply-text" @click="() => ElMessage('尚未开发')">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-show="commentUserId === item.userId">
            <el-input class="gray-bg-input" v-model="addCommentReq.content" type="textarea" :rows="3" autofocus
              placeholder="写下你的评论">
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../style.scss";

.container {
  padding: 0 10px;
  box-sizing: border-box;

  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $border-fourth;

    .info {
      display: flex;
      align-items: center;

      .avatar {
        border-radius: 50%;
      }

      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .name {
          font-size: 16px;
          color: $text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }

    .content {
      font-size: 16px;
      color: $text-main;
      line-height: 20px;
      padding: 10px 0;
    }

    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;

      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;

        &.active,
        &:hover {
          color: $color-main;
        }

        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }

      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: $text-333;
        }

        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }

    }

    .reply {
      margin: 10px 0;
      border-left: 2px solid $border-first;

      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed $border-third;

        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;

          .from-name {
            color: $color-main;
          }

          .to-name {
            color: $color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }

        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;

          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;

            &:hover {
              color: $text-333;
            }

            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }

      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        padding: 10px;
        cursor: pointer;

        &:hover {
          color: $text-main;
        }

        .el-icon-edit {
          margin-right: 5px;
        }
      }

      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }

      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }

      .input-wrapper {
        padding: 10px;

        .gray-bg-input,
        .el-input__inner {
          background-color: #67C23A;
        }

        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;

          .cancel {
            font-size: 16px;
            color: $text-normal;
            margin-right: 20px;
            cursor: pointer;

            &:hover {
              color: $text-333;
            }
          }

          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
