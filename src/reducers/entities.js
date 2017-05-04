import { combineReducers } from 'redux'
import * as consts from 'actions/consts'
import { removeFromArray } from 'scripts/utils'

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
    case consts.REFRESH_NEW_BABEL: {
      const user = state[action.payload.userId]
      const newLabels = user.newLabels ? user.newLabels : []
      const originLabels = user.labels.concat(newLabels)
      let newLabelFromServer = action.payload.labels
      
      for (let label of originLabels) {
        newLabelFromServer = removeFromArray(newLabelFromServer, true, label)
      }
      
      return {
        ...state,
        [action.payload.userId]: {
          ...user,
          newLabels: [
            ...newLabels,
            ...newLabelFromServer
          ],
          visitorHeadimgurls: action.payload.visitorHeadimgurls
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