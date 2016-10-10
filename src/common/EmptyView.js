'use strict'

import React, {Component, View} from 'react-native'
import F8Button from './F8Button'

export default class ErrorView extends Component {
  render () {
    let {onPress, caption} = this.props
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        }}>
      <F8Button type='error'
      caption={caption?caption:'No data loaded, try loading again!'}
      onPress={onPress}
      icon={require ('./img/empty.png')}/>
      </View>
    )
  }
}
