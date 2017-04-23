import { connect } from 'react-redux'
import App from 'components/App'
import * as actions from 'actions'

const mapState = state => ({
  isLoading: state.ui.isLoading,
  myself: state.myself
})

const mapDispatch = dispatch => ({
  loadingComplete() {
    dispatch(actions.toggleLoading(false))
  },
  loadMyself(id) {
    return dispatch(actions.refreshUser(id))
  }
})

export default connect(mapState, mapDispatch)(App)