import { combineReducers } from 'redux'

const id = (state = -1, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  id
})