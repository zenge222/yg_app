import api from '../api/apiConfig'
import request from '../api/request'

// 登录
export function _toLogin(data) {
    return request(api.toLogin, 'post', data);
}

// 获取技工信息
export function _getEmployeeInfo() {
    return request(api.getEmployeeInfo, 'get');
}

// 修改技工信息
export function _changeEmployeeInfo(data) {
    return request(api.changeEmployeeInfo, 'post', data);
}

// 签到
export function _toSignIn(data) {
    return request(api.toSignIn, 'post', data);
}