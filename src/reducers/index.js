import { combineReducers } from 'redux'
import myself from 'reducers/myself'
import ui from 'reducers/ui'

const combinedReducer = combineReducers({
  myself,
  ui
})

export default combinedReducer
