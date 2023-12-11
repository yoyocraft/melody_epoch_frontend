import HelloWorldVue from "../components/HelloWorld.vue";
import UserLoginViewVue from "../views/user/UserLoginView.vue";
import UserRrgisterViewVue from "../views/user/UserRegisterView.vue";
import MemberViewVue from "../views/member/MemberView.vue";
import BandViewVue from "../views/band/BandView.vue";
import AlbumViewVue from "../views/album/AlbumView.vue";
import SongViewVue from "../views/song/SongView.vue";
import ConcertViewVue from "../views/concert/ConcertView.vue";
import BandInfoViewVue from "../views/band/BandInfoView.vue";

const routes = [
  { path: "/", name: "主页", component: HelloWorldVue },
  {
    path: "/login",
    name: "登录",
    component: UserLoginViewVue,
  },
  {
    path: "/register",
    name: "注册",
    component: UserRrgisterViewVue,
  },
  {
    path: "/member",
    name: "乐队成员",
    component: MemberViewVue,
  },
  {
    path: "/band",
    name: "乐队",
    component: BandViewVue,
  },
  {
    path: "/band/info/:id",
    name: "乐队信息",
    component: BandInfoViewVue,
  },
  {
    path: "/album",
    name: "专辑",
    component: AlbumViewVue,
  },
  {
    path: "/song",
    name: "歌曲",
    component: SongViewVue,
  },
  {
    path: "/concert",
    name: "演唱会",
    component: ConcertViewVue,
  },
];

export default routes;
