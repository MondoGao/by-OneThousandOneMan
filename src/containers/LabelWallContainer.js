import {connect} from 'react-redux'
import LabelWall from 'components/LabelWall'

import { showedNewLabel } from 'actions'

const mapState = state => ({})

const mapDispatch = dispatch => ({
  finishShowNewLabel(userId) {
    dispatch(showedNewLabel(userId))
  }
})

export default connect(mapState, mapDispatch)(LabelWall)