'use strict'

import React, {Component, View} from 'react-native'
import F8Button from './F8Button'

export default class ErrorPage extends Component {
  render () {
    let {onPress, errMsg} = this.props
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        }}>
      <F8Button type='error' caption={errMsg?errMsg:'Error happened, try loading again!'} onPress={onPress} icon={require ('./img/error.png')}/>
      </View>
    )
  }
}
