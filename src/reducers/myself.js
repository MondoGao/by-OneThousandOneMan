import { combineReducers } from 'redux'
import * as consts from 'actions/consts'

const id = (state = '', action) => {
  switch (action.type) {
    case consts.REFRESH_MYSELF:
      return action.payload.id
    default:
      return state
  }
}

export default combineReducers({
  id
})