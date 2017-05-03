import {connect} from 'react-redux'
import LabelInput from 'components/LabelInput'

import { appendLabel } from 'actions'

const mapState = state => ({
  myselfId: state.myself.id
})

const mapDispatch = dispatch => ({
  appendNewLabel(userId, writerId, labelText) {
    return dispatch(appendLabel(userId, writerId, labelText))
  }
})

export default connect(mapState, mapDispatch)(LabelInput)