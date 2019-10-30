import request from '../../api/request';
import apiConfig from '../../api/apiConfig';
import * as types from '../mutations';

const login = {
  state: {
    mapKey: 'X7ABZ-724RG-CMFQX-I72XT-HSNSZ-HVBCR',
    // 登录状态
    authorization: '',
    // 是否在微信环境
    isMicromessenger: null,
    // 是否 iphoneX
    isIphoneX: false,
    // 技工信息
    employeeInfo: {
      truename: '',
      headImg: '',
      shopName: '',
      levelName: '',
      phone: '',
      nickname: ''
    }
  },
  mutations: {
    // 设置环境
    [types.SET_MICROMESSENGER](state, data) {
      state.isMicromessenger = data;
    },
    // 设置iphoneX
    [types.SETIPHONEX](state, data) {
      state.isIphoneX = data;
    },
    // 设置登录状态
    [types.SET_AUTHORIZATION](state, data) {
      state.authorization = data.token;
    },
    // 保存用户信息
    setEmployeeInfo(state, data) {
      state.employeeInfo = data;
    },
    // 修改用户昵称
    changeNickName(state, data) {
      state.employeeInfo.nickname = data;
    },
    // 修改用户头像
    changeHeadImg(state, data) {
      state.employeeInfo.headImg = data;
    }
  },
  actions: {}
}

export default login;