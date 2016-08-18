'use strict'
import React, {
  Component,
  Dimensions,
  Platform,
  Text,
  View,
} from 'react-native'

var Spinner = require('react-native-spinkit')
const window = Dimensions.get('window')

export default class FullScreenLoadingView extends Component {
  render () {
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: window.width,
          height: window.height,
          backgroundColor: 'transparent'
        }}>
        <Spinner style={{}} isVisible={true} size={50} type={'Wave'} color={'#CC0000'}/>
        <Text style={{marginTop: 16}}>{"Loading Cars..."}</Text>
      </View>
    )
  }
}
