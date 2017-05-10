import { combineReducers } from 'redux'
import * as consts from 'actions/consts'

const isLoading = (state = !localStorage.getItem('myselfId'), action) => {
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