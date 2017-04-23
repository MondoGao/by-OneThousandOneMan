import * as consts from 'actions/consts'
import * as sources from 'sources'

/**
 * 切换加载状态
 * @param {boolean} state
 */
export const toggleLoading = state => ({
  type: consts.TOGGLE_LOADING,
  payload: state
})

/**
 * 获取用户信息
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