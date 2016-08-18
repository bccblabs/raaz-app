'use strict'

import React, {
  Component,
  View
} from 'react-native'

import {connect} from 'react-redux'
import F8Header from '../common/F8Header'
import NotificationsList from './NotificationsList'
import {FilterStyles} from '../styles'
class Notifications extends Component {
  _innerRef: ?PureListView;

  constructor (props) {
    super (props)
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <F8Header
          foreground="dark"
          title="Notifications"
          style={FilterStyles.headerStyle}
          />
        <NotificationsList/>
      </View>
    )
  }

}

export default connect () (Notifications)
