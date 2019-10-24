/**
 * 基于axios封装请求类
 * @date:2019-7-9
 * @author:zwr
 */

import axios from 'axios';
import config from '@/config';
import {getToken} from '@/utils/auth';
import { Message } from 'element-ui';
import qs from 'qs';
import store from '@/store'

let defaultConfig = {
    baseURL: config.baseUrl,
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 20 * 1000 // request timeout
};
const contentType = {
    form:'application/x-www-form-urlencoded;charset=utf-8;',
    file:'multipart/form-data;charset=utf-8;'
};

const codeHandler = (res) => {
    switch (res.code) {
        case 498:
            break;
        case 403:
            window.location.href='/#/401';
            break;
        default:
            Message({
                message: res.msg || 'Error',
                type: 'error',
                offset:80,
                duration: 3 * 1000
            });
    }
};

function getService(config) {
    let servi = axios.create(config);
    // 重新封装get请求
    servi.newGet = servi.get;
    servi.get = (url,data) => {
        return servi.newGet(url,{params:data});
    };
    // 增加导出的请求
    servi.export = (url,data) => {
        let iframe = document.getElementById('exportIframe');
        if(!iframe){
            iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.id = 'exportIframe';
        }
        iframe.src = servi.defaults.baseURL + url + '?' + qs.stringify(data);
        document.documentElement.appendChild(iframe);
    };
    // request interceptor
    servi.interceptors.request.use(
        conf => {
            // 默认向 header 中添加 token 字段
            let token = getToken() || '';
            if(conf.headers){
                conf.headers['Authorization'] = token;
            }else{
                conf.headers = {'Authorization':token};
            }
            // 判断 POST 请求 formData 数据提交
            if(conf.method === 'post' && conf.headers['Content-Type'] === contentType.form){
                conf.data = qs.stringify(conf.data);
            }else if(conf.method === 'post' && conf.headers['Content-Type'] === contentType.file){
                let params = new FormData();
                Object.keys(conf.data).map(key => {
                    params.append(key,conf.data[key]);
                });
                conf.data = params;
            }
            return conf;
        },
        error => {
            return Promise.reject(error);
        }
    );
    // response interceptor
    servi.interceptors.response.use(
        response => {
            if(response.status !== 200){
                store.dispatch('errorLog/addErrorLog',{code:response.status,url:response.config.url,params:response.config.data || response.config.params,response:response.data});
            }
            const res = response.data;
            // if the custom code is not 20000, it is judged as an error.
            if (res.code !== 200) {
                store.dispatch('errorLog/addErrorLog',{code:res.code,url:response.config.url,params:response.config.data || response.config.params,response:res});
                codeHandler(res);
                return Promise.reject(res);
            } else {
                return res.data;
            }
        },
        error => {
            return Promise.reject(error);
        }
    );
    return servi;
}


// create an axios instance
const service = getService(defaultConfig);

/*
*   获取 CONTENT-TYPE:X-WWW-FORM-URLENCODED  的service
 */
const formService = getNewService({
    headers:{
        'Content-Type':contentType.form
    }
});

/*
*   获取 CONTENT-TYPE:X-WWW-FORM-URLENCODED  的service
 */
const fileService = getNewService({
    timeout: 300 * 1000,
    headers:{
        'Content-Type':contentType.file
    }
});

/*
*   获取新的封装请求类
 */
function getNewService(param) {
    return getService(Object.assign({},defaultConfig,param))
}

export {
    service,
    formService,
    fileService
};
