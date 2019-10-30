import api from '../api/apiConfig'
import request from '../api/request'

// 获取工作列表
export function _getWorkList(data) {
    return request(api.getWorkList, 'get', data)
}

// 获取工作内容
export function _getJobContent(id) {
    return request(api.getJobContent, 'get')
}

// 获取工作消息
export function _getWorkMessage() {
    return request(api.getWorkMessage, 'get')
}

// 获取工作通知
export function _getWorkNotice(data) {
    return request(api.getWorkNotice, 'get', data)
}

// 地址解析经纬度
export function _getLongLat(data) {
    return request(api.getLongLat, 'get', data)
}

// 是否再区域范围
export function _locationScope(data) {
    return request(api.locationScope, 'get', data)
}

// 工作提交
export function _workSubmit(data) {
    return request(api.workSubmit, 'post', data)
}

// 更新工作通知 
export function _updateMessage(data) {
    return request(api.updateMessage, 'post', data)
}