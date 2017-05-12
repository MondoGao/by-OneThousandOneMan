import { combineReducers } from 'redux'
import * as consts from 'actions/consts'

const isLoading = (state = true, action) => {
  switch (action.type) {
    case consts.TOGGLE_LOADING:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  isLoading
})