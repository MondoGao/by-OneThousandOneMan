import { connect } from 'react-redux'
import App from 'components/App'
import * as actions from 'actions'

const mapState = state => ({
  isLoading: state.ui.isLoading
})

const mapDispatch = dispatch => ({
  loadingComplete() {
    dispatch(actions.loadingComplete())
  }
})

export default connect(mapState, mapDispatch)(App)