/**
 * 基于axios封装请求类
 * @date:2019-7-9
 * @author:zwr
 */

import axios from 'axios';
import config from '@/config/index';

let defaultConfig = {
  baseURL: config.baseUrl,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20*1000 // request timeout
}
// create an axios instance
const _axios = axios.create(defaultConfig)

// request interceptor
_axios.interceptors.request.use(
    conf => {
        return conf;
    },
    error => {
    return Promise.reject(error);
    }
)

// response interceptor
_axios.interceptors.response.use(
  response => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      console.log(res.code);
      return Promise.reject(res.code);
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  }
)

/*
*   默认请求类
 */
function service(data) {
	return _axios(data);
}

/*
*   获取新的封装请求类
 */
function getNewService(param){
	return service(Object.assign(defaultConfig,param));
}

export {
    service,
	getNewService
};
