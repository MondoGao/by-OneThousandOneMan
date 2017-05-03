import * as consts from 'actions/consts'
import * as sources from 'sources'
import { getCookie } from 'scripts/utils'

/**
 * {creator} 切换加载状态
 * @param {boolean} state
 */
export const toggleLoading = state => ({
  type: consts.TOGGLE_LOADING,
  payload: state
})

/**
 * {thunk} 获取用户信息
 * @param {string} id
 * @return {Promise}
 */
export const refreshUser = id => (dispatch, getState) => {
  return sources.getUser(id)
    .then(normalizedData => {
      dispatch({
        type: consts.REFRESH_USER,
        payload: normalizedData
      })
    })
}

/**
 * {thunk} 增加新标签
 * @param {string} userId
 * @param {string} writerId
 * @param {string} labelText
 * @return {Promise}
 */
export const appendLabel = (userId, writerId, labelText) => dispatch => {
  return sources.addLabel(userId, writerId, labelText)
    .then(() => {
      dispatch({
        type: consts.APPEND_LABEL,
        payload: {
          userId,
          labelText
        }
      })
    })
}

export const appendVisitor = (userId, visitorId) => (dispatch, getState) => {
  return sources.addVisitor(userId, visitorId)
    .then(() => {
      dispatch({
        type: consts.APPEND_VISITOR,
        payload: {
          userId,
          visitorId
        }
      })
    })
}

export const createWall = userId => dispatch => {
  return sources.createWall(userId)
    .then(() => {
      dispatch({
        type: consts.CREATE_WALL,
        payload: {
          userId
        }
      })
    })
}

/**
 * 登陆并获取用户信息
 * @type {thunk}
 * @param {string} code 微信登陆 code
 */
export const login = code => (dispatch, getState) => {
  return sources.login(code)
    .then(normalizedData => {
      return dispatch({
        type:consts.LOGIN_IN,
        payload: normalizedData
      })
    })
}

/**
 * {creator} 完成显示新添加的标签
 * @param {string} userId
 */
export const showedNewLabel = userId => ({
  type: consts.NEW_LABEL_SHOWED,
  payload: {
    userId
  }
})