import {connect} from 'react-redux'
import UserPage from 'components/UserPage'
import * as actions from 'actions'

const mapState = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.id],
  myself: state.entities.users[state.myself.id]
})

const mapDispatch = dispatch => ({
  loadMyself(id) {
    return dispatch(actions.refreshUser(id))
  }
})

export default connect(mapState, mapDispatch)(UserPage)