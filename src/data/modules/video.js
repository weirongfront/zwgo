import {service} from '../index';

export function getVideoList() {
    return service({
        url: 'video/list',
        method: 'get'
    })
}

export function getHomeVideoList() {
    return service.get('video/homeList');
}

export function getVideoById(data) {
    return service.get('video/getById',data);
}