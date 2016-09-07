'use strict'

import React, {
  Component,
  View,
  TouchableOpacity
} from 'react-native'

import {PostStyles} from '../styles'
export default class Reload extends Component {
  render (
    <TouchableOpacity onPress={this.props.reload}>
      <Text style={PostStyles.title}>
      {"Error Loading Data, Try Reloading Again..."}
      </Text>
    </TouchableOpacity>
  )
}
