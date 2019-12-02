//token存储
const TokenKey = 'jwt_token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

//粉丝统计数据存储
// export function saveFansData(open_id, data) {
//   return localStorage.setItem(open_id, data)
// }

// export function getFansData(open_id) {
//   return localStorage.getItem(open_id)
// }
