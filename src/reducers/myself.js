import { combineReducers } from 'redux'

/*Todo: Fake Data*/
const id = (state = 'myself', action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  id
})