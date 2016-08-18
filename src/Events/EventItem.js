'use strict'
import React, {
  Component,
  PropTypes,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'


import {Styles, ButtonStyles} from '../styles'
var numeral = require ('numeral')
import {Actions} from 'react-native-router-flux'
import {Heading2, Text} from '../common/F8Text'
import ProfilePicture from '../common/ProfilePicture'
import HorizontalScrollContainer from '../components/HorizontalScrollContainer'

export default class EventItem extends Component {

  render () {
    const {data} = this.props
    const {
            items,
            media,
            makeModelString,
            dealerName,
            dealerPhone,
            dealerEmail,
            dealerCity,
            dealerState,
            dealerLogo,
            title
          } = data

    return (
        <View style={{backgroundColor: 'white', padding: 16}}>
          <Image
            source={{uri: dealerLogo}}
            style={{
              resizeMode: 'contain',
              height: 30,
              width: 150,
            }}
          />
          <Text style={{alignSelf: 'flex-start', color: 'black', fontWeight: 'bold', padding: 6, fontSize: 10}}>
            {title?title:makeModelString}
          </Text>
          <TouchableOpacity style={{alignItems: 'center', paddingVertical: 16}} onPress={this.props.onPress}>
          </TouchableOpacity>
          </View>
        )
  }
}
