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
