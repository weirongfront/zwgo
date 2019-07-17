import {service,getNewService} from '@/data/index';

function service1(param) {
  param.baseURL = 'https://www.baidu.com';
  return getNewService(param);
}

export function login(data) {
  return service({
    url: '/user/login',
    method: 'post',
    data
  });
}

export function logout() {
  return service1({
    url: '/user/logout',
    method: 'post'
  });
}
