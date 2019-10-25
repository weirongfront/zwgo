import {service} from '../index';

export function getLogList() {
    return service({
        url: 'log/list',
        method: 'get'
    })
}