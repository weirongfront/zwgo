import {service} from '@/data/index'


export function login(data) {
  return service({
    url: '/user/login',
    method: 'post',
    data
  });
}

export function logout(data) {
  return service({
    url: '/user/logout',
    method: 'post'
  });
}
