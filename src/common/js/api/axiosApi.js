import axios from 'axios'
import {Message} from 'element-ui'
import router from "../../../router/index";
import store from '../../../store/index'

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true;

//axios请求前做些什么
  axios.interceptors.request.use(config => {
    if (localStorage.getItem('Sys-Token') !== null && localStorage.getItem('Sys-Token') !== '') {
      //判断是否存在token，如果存在将每个页面header都添加token
      config.headers.common['Sys-Token'] = localStorage.getItem('Sys-Token')
    }
    return config;
  }, error => {
// 对请求错误做些什么
    return Promise.reject(error);
  });
//axios接收响应前做些什么
axios.interceptors.response.use(res => {
  //用户登录失效
  if (res.data.code === '601' || res.data.code === '602' || res.data.code === '603') {
    Message.warning(res.data.message);
    // 清除登录信息
    store.commit('delToken');
    store.commit('delUser');
    store.commit('cleanRoute');
    router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    });
    //取消调用链
    source.cancel()
    return Promise.reject(res.data)
  } else {
    return res;
  }
}, error => {
  if (axios.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
    return new Promise(() => {
    });
  } else {
    return Promise.reject(error);
  }
});

//数据格式为application/x-www-form-urlencoded的post请求
export const commonRequest = (url, params) => {
  console.log( axios.defaults.baseURL + url)
  return axios({
    method: 'post',
    url:  url,
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let item in data) {
        ret += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
};

//数据格式为JSON的post请求
export const jsonRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

//不带参数的get请求
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: url,
  });
};

//含有文件的请求
export const postFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};
