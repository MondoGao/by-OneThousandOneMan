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
    case consts.APPEND_VISITOR: {
      const user = state[action.payload.userId]
      const visitor = state[action.payload.visitorId]
  
      return {
        ...state,
        [action.payload.userId]: {
          ...user,
          visitorAvatars: [
            visitor.avatar,
            ...user[visitorAvatars].slice(0, 5)
          ]
        }
      }
    }
    case consts.CREATE_WALL: {
      const user = state[action.payload.userId]
  
      return {
        ...state,
        [action.payload.userId]: {
          ...user,
          hasWall: true
        }
      }
    }
    case consts.NEW_LABEL_SHOWED: {
      const user = state[action.payload.userId]
  
      return {
        ...state,
        [action.payload.userId]: {
          ...user,
          labels: [
            ...user.labels,
            ...user.newLabels
          ],
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