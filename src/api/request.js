import axios from 'axios';
// import apiConfig from './apiConfig';
// import router from '../router/index';
import qs from 'qs'
import store from '../store/index'
import router from '../router/index';
import * as types from '../store/mutations';
axios.defaults.baseURL = "http://employee.omnrj.com";
axios.defaults.timeout = 5000;
// axios.defaults.headers.jsonType = "jsonType";

require('es6-promise').polyfill() //axios是基于Promise 兼容低版本浏览器

function fetch(url, method = 'get', data = {}) {
  const instance = axios.create({});
  // http request 拦截器
  instance.interceptors.request.use((config) => {
      const res = config;
      config.headers["authorization"] = store.state.login.authorization;
      return res;
    },
    (err) => {
      const error = err;
      return Promise.reject(error);
    },
  );
  // http response 拦截器
  instance.interceptors.response.use((response) => {
      const res = response;
      if (res.headers.authorization) {
        let anthToken = {
          token: res.headers.authorization
        }
        store.commit(types.SET_AUTHORIZATION, anthToken);
      }
      if (res.data.data && res.data.data.code && (res.data.data.code == 100011 || res.data.data.code == 100023 || res.data.data.code == 100021)) {
        // let anthToken = {
        //   token: ''
        // }
        // store.commit(types.SET_AUTHORIZATION, anthToken);
        router.replace({
          path: '/',
          // query: { redirect: router.currentRoute.fullPath }
        });
      }
      return res;
    },
    (err) => {
      const error = err;
      if (error.response) {

      }
      return Promise.reject(error); // 返回接口返回的错误信息
    },
  );

  switch (method) {
    case 'get':
      return instance.get(url, {
        params: data
      });
    case 'post':
      if (data instanceof FormData) {
        // axios.defaults.headers = {
        //   'Content-type': 'multipart/form-data'
        // }
        return instance.post(url, data);
      }
      //   axios.defaults.headers = {
      //     'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      //   }
      //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
      //qs.parse()将URL解析成对象的形式
      return instance.post(url, qs.stringify(data));
    case 'put':
      return instance.put(url, data);
    case 'delete':
      return instance.delete(url, data);
    default:
      return instance.get(url, {
        params: data
      });
  }
}


function request(url, method = 'get', data = {}) {
  return new Promise((resolve, reject) => {
    const resData = fetch(url, method, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
    return resData;
  });
}
export default request;