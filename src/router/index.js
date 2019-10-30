import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
import SignIn from '@/components/signIn'
import Message from '@/components/message'
import WorkNoticeList from '@/components/workNoticeList'
import My from '@/components/my'
import SetUp from '@/components/setUp'
import ChangePwd from '@/components/changePwd'
import ErrorPage from '@/components/errorPage'
import Test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '嘉美员工端',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        title: '嘉美员工端',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn,
      meta: {
        title: '嘉美员工端',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        title: '嘉美员工端',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/workNoticeList',
      name: 'WorkNoticeList',
      component: WorkNoticeList,
      meta: {
        title: '嘉美员工端',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      meta: {
        title: '嘉美员工端',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/setUp',
      name: 'SetUp',
      component: SetUp,
      meta: {
        title: '嘉美员工端',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/changePwd',
      name: 'ChangePwd',
      component: ChangePwd,
      meta: {
        title: '密码修改',
        requireAuth: false,
        keepAlive: false
      }
    },
    {
      path: '*',
      name: 'ErrorPage',
      component: ErrorPage,
      hidden: true
    }
  ],
  // mode: 'history',
  // history: true,
})