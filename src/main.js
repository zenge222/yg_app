import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import * as types from './store/mutations';
Vue.config.productionTip = false
Vue.prototype.$store = store;
// availWidth 属性声明了显示浏览器的屏幕的可用宽度
if (/iphone/gi.test(navigator.userAgent) && (screen.availHeight == 812 && screen.availWidth == 375)) {
  store.commit(types.SETIPHONEX, false);
}
let ua = navigator.userAgent.toLowerCase();
// 是否在微信环境
if (ua.match(/MicroMessenger/i) == "micromessenger") store.commit(types.SET_MICROMESSENGER, true);
import {
  Lazyload,
  Toast,
  Notify
} from 'vant';
Vue.use(Lazyload)
Vue.prototype.$Notify = Notify;
Vue.prototype.$Toast = Toast;
Vue.prototype.pushTo = function (path, parameter = {}) {
  router.push({
    name: path,
    params: parameter
  });
};
Vue.prototype.replaceTo = function (path, parameter = {}) {
  router.replace({
    name: path,
    params: parameter
  });
};

router.beforeEach((to, from, next) => {
  // 设置title
  if (to.meta.title) {
    window.document.title = to.meta.title;
  }
  next();
})

// 跳转后返回顶部
router.afterEach((to, from, next) => {
  // window.scrollTo(0, 0);
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')