import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import AfterConnect from '../views/AfterConnect.vue'
import Main from '../views/main'
import UserStat from '../views/main/UserStat'
import MyFans from '../views/main/MyFans'
import MyFocus from '../views/main/MyFocus'
import MyVideos from '../views/main/MyVideos'
import FansStat from '../views/main/FansStat'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes :[
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/after_connect',
      name: 'after_connect',
      component: AfterConnect
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children:[
        {
          path:'/userstat',
          name: 'userstat',
          component: UserStat
        },
        {
          path: '/myfans',
          name: 'myfans',
          component: MyFans
        },
        {
          path: '/myfocus',
          name: 'myfocus',
          component: MyFocus
        },
        {
          path: '/fans_stat',
          name: 'fansStat',
          component: FansStat
        },
        {
          path: '/myvideos',
          name: 'myVideos',
          component: MyVideos
        }
      ]
    }
  ]
})

export default router
