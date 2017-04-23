import { connect } from 'react-redux'
import * as actions from 'actions'
import Home from 'components/Home'

const mapState = state => ({
  myself: state.entities.users[state.myself.id]
})

const mapDispatch = dispatch => ({
})

export default connect(mapState, mapDispatch)(Home)