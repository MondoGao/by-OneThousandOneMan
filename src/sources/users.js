import { normalize } from 'normalizr'

import { commonFetchGet, checkStatus, promiseCatch } from 'sources/utils'
import { user } from 'sources/schemas'
import { settings } from 'sources'

export const getUser = (id) => {
  if (!id) {
    throw new Error('无效的用户id')
  }

  return commonFetchGet(`${settings.publicPath}api/users/${id}`, user)
}

export const refreshLabels = id => {
  return fetch(`${settings.publicPath}api/users/${id}`, {
    credentials: 'same-origin'
  })
    .catch(err => console.log(err))
    .then(data => data.json())
    .then(data => normalize(data, user))
}

export const addLabel = (userId, writerId, labelText) => {
  return fetch(`${settings.publicPath}api/users/${userId}/labels`, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      writerId,
      labelText
    })
  })
    .then(checkStatus)
    .catch(promiseCatch)
}

export const addVisitor = (userId, visitorId) => {
  return fetch(`${settings.publicPath}api/users/${userId}/visitors`, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      visitorId
    })
  })
    .then(checkStatus)
    .catch(promiseCatch)
}

export const createWall = userId => {
  return fetch(`${settings.publicPath}api/users/${userId}`, {
    method: 'PATCH',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      hasWall: true
    })
  })
    .then(checkStatus)
    .catch(promiseCatch)
}

/**
 * 登陆并获取用户信息
 * @param {string} code 微信登陆代码
 * @return {Promise}
 */
export const login = code => (
  fetch(`${settings.publicPath}api/weixin/authorize`, {
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
    .catch(promiseCatch)
    .then(data => data.json())
)