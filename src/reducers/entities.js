import { combineReducers } from 'redux'
import * as consts from 'actions/consts'

const users = (state = {}, action) => {
  switch (action.type) {
    case consts.REFRESH_USER:
      return {
        ...state,
        ...action.payload.entities.users
      }
    default:
      return state
  }
}

export default combineReducers({
  users
})