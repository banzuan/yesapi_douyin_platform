import axios from 'axios'
import store from '@/store'
import { getToken } from './auth'
import { MessageBox, Message } from 'element-ui'
import router from '@/router'



//创建axios实例
const service = axios.create({
  baseURL: 'http://top-api.yesapi.top/',
  timeout: 50000 //请求超时时间
})

//request拦截器
service.interceptors.request.use(
  //对请求前处理，使请求附带token
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  //对请求错误处理
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  //对响应数据的处理
  response => {
    if(response.status != 200) {
      MessageBox.alert('请求失败，错误状态码为'+response.status, "提示", {
        confirmButtonText: '确定',
        showClose: false
      }).then(()=>{
        router.push('/')
      })
    }
    if (response.status === 200) {
      
      if (response.data.ret === 400) {
        MessageBox.alert('非法请求，参数错误', "提示", {
          confirmButtonText: '确定',
          showClose: false
        })
        // store.dispatch('user/resetToken')
      } else if (response.data.ret === 404) {
        MessageBox.alert('接口服务不存在', "提示", {
          confirmButtonText: '确定',
          showClose: false
        })
        // store.dispatch('user/resetToken')
      } else if (response.data.ret === 406) {
        MessageBox.alert('账号未登录', '提示', {
          confirmButtonText: '确定',
          showClose: false
        })
        // store.dispatch('user/resetToken')
      } else if(response.data.ret === 407) {
        MessageBox.alert('非法open_id，抖音号不存在', '提示', {
          confirmButtonText: '确定',
          showClose: false
        })
        // store.dispatch('user/resetToken')
      }
    }

    let data = response.data
    
    return data
  }
)

export default service

