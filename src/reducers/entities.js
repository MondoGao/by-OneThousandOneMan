import { combineReducers } from 'redux'
import * as consts from 'actions/consts'

const users = (state = {}, action) => {
  switch (action.type) {
    case consts.APPEND_LABEL: {
      const user = state[action.payload.userId]
      const newLabels = user.newLabels ? user.newLabels : []
      
      return {
        ...state,
        [action.payload.userId]: {
          ...user,
          newLabels: [
            ...newLabels,
            action.payload.labelText
          ]
        }
      }
    }
    case consts.NEW_LABEL_SHOWED: {
      const user = state[action.payload.userId]
  
      return {
        ...state,
        [action.payload.userId]: {
          ...user,
          newLabels: []
        }
      }
    }
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