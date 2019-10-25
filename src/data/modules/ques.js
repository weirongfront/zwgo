import {service} from '../index';

export function getQuesList() {
    return service.get('ques/list');
}

export function getQuesMyList() {
    return service.get('ques/mylist');
}

export function add(data) {
    return service.post('ques/add',data);
}

export function getById(data) {
    return service.get('ques/getById',data);
}

export function saveAnswer(data) {
    return service.post('ques/saveAnswer',data);
}

export function getAnswListById(data) {
    return service.get('ques/getAnswList',data);
}

export function getReportById(data) {
    return service.get('ques/getReportByAnswId',data);
}