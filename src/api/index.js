import request from '../../plugins/request'

//注册
export function signUp(data) {
  return request({
    url: '/?service=App.User.Register',
    method: 'post',
    data
  })
}

//登陆
export function login(data) {
  return request({
    url: '/?service=App.User.Login',
    method: 'post',
    data
  })
}

//生成添加绑定抖音id的url
export function initConnect(data) {
  return request({
    url: '/?service=App.Douyin.PrepareConnect',
    method: 'post',
    data
  })
}

//接受并绑定抖音账号
export function addBind(data) {
  return request({
    url: '/?service=App.Douyin.AddAndBind',
    method: 'post',
    data
  })
}

//获取单独抖音账号信息
export function getStat(data) {
  return request({
    url: '/?service=App.Douyin.Userinfo',
    method: 'post',
    data
  })
}

//获取用户的所有抖音id
export function getDouyinList(data) {
  return request({
    url: '/?service=App.User.GetBindDouyinUserList',
    method: 'post',
    data
  })
}

//获取粉丝数据
export function getFansData(data) {
  return request({
    url: '/?service=App.Douyin.FansData',
    method: 'post',
    data
  })
}


//获取粉丝列表
export function getFanslist(data) {
  return request({
    url: '/?service=App.Douyin.Fanslist',
    method: 'post',
    data
  })
}

//获取关注列表
export function getFocuslist(data) {
  return request({
    url: '/?service=App.Douyin.GetFollowList',
    method: 'post',
    data
  })
}


//获取关注列表
export function getFansDetailByDay(data) {
  return request({
    url: '/?service=App.Douyin.GetFansDetailByDay',
    method: 'post',
    data
  })
}

//获取视频列表
export function getVideoList(data) {
  return request({
    url: '/?service=App.Douyin.GetVideoList',
    method: 'post',
    data
  })
}

//获取视频数据
export function getVideoData(data) {
  return request({
    url: '/?service=App.Douyin.GetVideoData',
    method: 'post',
    data
  })
}


