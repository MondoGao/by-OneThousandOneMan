import { commonFetchGet, checkStatus } from 'sources/utils'
import { user } from 'sources/schemas'

export const getUser = (id) => {
  if (!id) {
    throw new Error('无效的用户id')
  }

  return commonFetchGet(`/api/users/${id}`, user)
}

export const addLabel = (userId, labelText) => {
  return fetch(`/api/users/${userId}/labels`, {
    method: 'POST',
    credentials: 'same-origin',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      labelText
    })
  })
    .then(checkStatus)
}

export const addVisitor = (userId, visitorId) => {
  return fetch(`/api/users/${userId}/visitors`, {
    method: 'POST',
    credentials: 'same-origin',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      visitorId
    })
  })
    .then(checkStatus)
}

export const createWall = userId => {
  return fetch(`/api/users/${userId}`, {
    method: 'PUT',
    credentials: 'same-origin',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 1
    })
  })
    .then(checkStatus)
}

/**
 * 登陆并获取用户信息
 * @param {string} code 微信登陆代码
 * @return {Promise}
 */
export const login = code => (
  fetch(`/api/weixin/authorize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      code
    })
  })
    .then(checkStatus)
    .then(data => data.json())
)