import { combineReducers } from 'redux'

let myselfId = document.cookie.split(/[=;]/)[1]
console.log(myselfId)
const id = (state = "owA1hxBSL-qH31mtemFiLWLuxR-M", action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  id
})