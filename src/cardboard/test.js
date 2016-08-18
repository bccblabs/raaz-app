'use strict'

import React, {
  Component,
  View
} from 'react-native'

import VRVideo from './VRVideo'
import VRImage from './VRImage'

export default class Test extends Component {
  render () {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
          <RNVRPlayer style={{height: 300, width: 300, backgroundColor: 'lightgray', alignSelf: 'center'}}/>
      </View>
    )
  }
}
