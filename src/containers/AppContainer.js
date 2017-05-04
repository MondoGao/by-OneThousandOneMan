import { connect } from 'react-redux'
import App from 'components/App'
import * as actions from 'actions'

const mapState = state => ({
  isLoading: state.ui.isLoading,
  myself: state.myself,
  users: state.entities.users
})

const mapDispatch = dispatch => ({
  loadingComplete() {
    dispatch(actions.toggleLoading(false))
  },
  loadUser(id) {
    return dispatch(actions.refreshUser(id))
  },
  login(code) {
    return dispatch(actions.login(code))
  },
  refreshLabels(userId) {
    return dispatch(actions.refreshNewLabel(userId))
  }
})

export default connect(mapState, mapDispatch)(App)