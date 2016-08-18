'use strict'
import React, {
  Component,
  Image,
  Text,
  View,
} from 'react-native'
import VRImage from '../cardboard/VRImage'
import Overlay from 'react-native-overlay'
import {VibrancyView} from 'react-native-blur'
import {Actions} from 'react-native-router-flux'
import {CarmeraStyles, Styles} from '../styles'
import LinearGradient from 'react-native-linear-gradient';
import {Heading1, Heading2} from '../common/F8Text'
import F8Button from '../common/F8Button'
export default class Carmera extends Component {
    render () {
      return (
        <View style={CarmeraStyles.wrapper}>
        <View style={{flex: 1,alignItems: 'center', padding: 32}}>
        <Image
          style={{height: 40, width: 40, marginBottom: 8}}
          source={require('../images/carmera.png')}/>
        <Text style={{
          textAlign:'center',
          fontWeight: '700',
          size: 8,
          color: 'black',
          marginBottom: 8}}>
          {"...Or try finding cars using photos"}
        </Text>
        </View>
        </View>
      )
    }
}
