import HelloWorldVue from "../components/HelloWorld.vue";
import UserLoginViewVue from "../views/user/UserLoginView.vue";
import UserRrgisterViewVue from "../views/user/UserRegisterView.vue";

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
];

export default routes;
