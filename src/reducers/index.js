import { combineReducers } from 'redux'
import myself from 'reducers/myself'
import ui from 'reducers/ui'
import entities from 'reducers/entities'

export default combineReducers({
  entities,
  myself,
  ui
})
