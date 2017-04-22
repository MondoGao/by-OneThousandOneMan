import * as consts from 'actions/consts'

/**
 *
 * @param {boolean} state
 */
export const toggleLoading = state => ({
  type: consts.TOGGLE_LOADING,
  payload: state
})