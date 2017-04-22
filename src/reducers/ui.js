import { combineReducers } from 'redux'
import * as consts from 'actions/consts'

const isLoading = (state = true, action) => {
  switch (action.type) {
    case consts.LOADING_COMPLETE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  isLoading
})