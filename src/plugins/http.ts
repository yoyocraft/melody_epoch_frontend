import axios, { AxiosInstance } from "axios";

// const isDev = process.env.NODE_ENV === "development";

const http: AxiosInstance = axios.create({
  // baseURL: isDev ? "http://localhost:8999/api" : "http://xxx",
  baseURL: "http://localhost:8999/api",
  timeout: 10000,
});

http.defaults.withCredentials = true; // 配置为true

http.interceptors.request.use(
  function (config) {
    let token = window.localStorage.getItem("token");
    if (token) {
      //将token放到request header的Authorization中
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // 未登录则跳转到登录页
    if (response?.data?.code === 40500) {
      window.location.hash = "/login";
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default http;
