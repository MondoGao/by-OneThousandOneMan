import * as consts from 'actions/consts'

export const loadingComplete = () => ({
  type: consts.LOADING_COMPLETE,
  payload: true
})