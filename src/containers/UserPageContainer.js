import {connect} from 'react-redux'
import UserPage from 'components/UserPage'

const mapState = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.id],
  myself: state.entities.users[state.myself.id]
})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(UserPage)