import { normalize } from 'normalizr'

/**
 * 检查 HTTP 错误
 * @param response
 * @return {Response|Error}
 */
export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

/**
 * 通用 Fetch Get 方法
 * @param {string} url URl
 * @param {schema} schema 用于标准化返回数据的 schema
 * @return {Promise}
 */
export const commonFetchGet = (url, schema) => (
  fetch(url, {
    credentials: 'same-origin'
  })
    .then(checkStatus)
    .then(data => data.json())
    .then(data => normalize(data, schema))
)

/**
 * 获取 querystring
 * @param {string} name
 * @param {string=} url
 * @return {''|null|string}
 */
export const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, "\\$&")
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}