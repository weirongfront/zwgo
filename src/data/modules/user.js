import {service} from '../index';

export function login(data) {
    return service({
        url: 'user/login',
        method: 'post',
        data
    })
}
export function register(data) {
    return service({
        url: 'user/register',
        method: 'post',
        data
    })
}

export function getUserList() {
    return service({
        url: 'user/list',
        method: 'get'
    })
}

export function getUserInfo(data) {
    return service({
        url: 'user/info',
        method: 'get',
        params:data
    })
}

export function logout() {
    return service({
        url: 'user/logout',
        method: 'post'
    })
}

export function updatePwd(data) {
    return service.post('user/updatePwd',data);
}

export function setStatusById(data) {
    return service.post('user/setStatusById',data);
}
