'use strict'
import React, {
  Component,
  View,
} from 'react-native'

import {connect} from 'react-redux'

import History from '../components/History'
import * as historyActions from '../reducers/history/historyActions'

const mapStateToProps = (state) => {
    const { history: {trims, trimIds} } = state
    return {
      saved_trims
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromHistory: (trimId) => {
      dispatch (historyActions.removeFromHistory (trimId))
    }
  }
}

class CarList extends Component {
  render () {
    return (<View/>)
  }
}

export default connect ()(CarList)
