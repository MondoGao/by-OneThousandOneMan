import { connect } from 'react-redux'
import * as actions from 'actions'
import Home from 'components/Home'

const mapState = state => ({
  myself: state.entities.users[state.myself.id]
})

const mapDispatch = dispatch => ({
  createWall(userId) {
    return dispatch(actions.createWall(userId))
  }
})

export default connect(mapState, mapDispatch)(Home)