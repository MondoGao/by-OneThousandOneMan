import {connect} from 'react-redux'
import UserPage from 'components/UserPage'
import * as actions from 'actions'

const mapState = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.id],
  myself: state.entities.users[state.myself.id]
})

const mapDispatch = dispatch => ({
  loadUser(userId) {
    return dispatch(actions.refreshUser(userId))
  },
  appendVisitor(userId, visitorId) {
    return dispatch(actions.appendVisitor(userId, visitorId))
  }
})

export default connect(mapState, mapDispatch)(UserPage)