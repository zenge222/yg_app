const apiConfig = {
  toLogin: '/sign/login',
  getEmployeeInfo: '/employee/info',
  getWorkList: '/services/staffList',
  getJobContent: '/servicesItem/list',
  getWorkNotice: '/employeeMessage/list',
  getWorkMessage: '/employeeMessage/info',
  getLongLat: 'https://apis.map.qq.com/ws/geocoder/v1',
  locationScope: 'https://apis.map.qq.com/ws/distance/v1',
  workSubmit: '/servicesItem/update',
  changeEmployeeInfo: '/employee/update',
  toSignIn: '/services/signIn',
  updateMessage: "/employeeMessage/updateStatus"
};
export default apiConfig;