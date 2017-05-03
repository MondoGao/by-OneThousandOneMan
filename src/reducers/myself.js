import { combineReducers } from 'redux'
import * as consts from 'actions/consts'

let savedId = localStorage.getItem('myselfId') || ''
const id = (state = savedId, action) => {
  switch (action.type) {
    case consts.LOGIN_IN:
      localStorage.setItem('myselfId', action.payload.id)
      
      return action.payload.id
    default:
      return state
  }
}

export default combineReducers({
  id
})