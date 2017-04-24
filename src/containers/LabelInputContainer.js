import {connect} from 'react-redux'
import LabelInput from 'components/LabelInput'

import { appendLabel } from 'actions'

const mapState = state => ({})

const mapDispatch = dispatch => ({
  appendNewLabel(userId, labelText) {
    return dispatch(appendLabel(userId, labelText))
  }
})

export default connect(mapState, mapDispatch)(LabelInput)