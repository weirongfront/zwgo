import {service} from '../index';

export function getNotebookList() {
    return service({
        url: 'notebook/list',
        method: 'get'
    })
}

export function getHomeVideoList() {
    return service.get('video/homeList');
}

export function getVideoById(data) {
    return service.get('video/getById',data);
}