'use strict'
import React, {
  Component,
  PropTypes,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'


import {Styles, ButtonStyles} from '../styles'
var numeral = require ('numeral')
import {Actions} from 'react-native-router-flux'
import {Heading2, Text} from '../common/F8Text'
import ProfilePicture from '../common/ProfilePicture'

export default class Part extends Component {
  constructor (...args) {
    super (...args)
  }

  render () {
    const {data} = this.props
    const {description, media, name} = data

    return (
        <View style={{backgroundColor: 'white', margin: 8, flexDirection: 'column'}}>
          <Text numberOfLines={2} style={styles.title}>{name}</Text>
          <Image source={{uri: data.media[0]}} resizeMode="contain" style={{height:150, width: 150, margin: 8}}/>
        </View>
    )
  }
}

let styles = StyleSheet.create({
  title: {
    alignSelf: 'flex-start',
    color: 'black',
    fontWeight: 'bold',
    padding: 6,
    fontSize: 10
  }
})
