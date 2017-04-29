import * as consts from 'actions/consts'
import * as sources from 'sources'

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
 * @param {string} labelText
 * @return {Promise}
 */
export const appendLabel = (userId, labelText) => dispatch => {
  return sources.addLabel(userId, labelText)
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
 * {creator} 完成显示新添加的标签
 * @param {string} userId
 */
export const showedNewLabel = userId => ({
  type: consts.NEW_LABEL_SHOWED,
  payload: {
    userId
  }
})