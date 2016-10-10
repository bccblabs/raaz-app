'use strict'
import React, {
  Component,
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import {Actions} from 'react-native-router-flux'
const { VibrancyView } = require('react-native-blur');

import F8Button from '../common/F8Button'

import {CarmeraStyles, Styles} from '../styles'
import {Heading1, Heading2} from '../common/F8Text'

var ImagePickerManager = require('NativeModules').ImagePickerManager
import {ImageOptions, VideoOptions} from '../constants/pickerOptions'

export default class Carmera extends Component {

  constructor(props) {
    super (props)
    this.pickImage = this.pickImage.bind (this)
    this.state = {
      images: [],
    }
  }

  render () {
    let {title, media} = this.props
    return (
      <View style={CarmeraStyles.wrapper}>
      <TouchableOpacity onPress={this.props.onPress || this.pickImage}>
      <Image source={require ('../images/2jz.png')} style={CarmeraStyles.wrapper}>
      <VibrancyView blurType="xlight" style={CarmeraStyles.wrapper}>
      <Image
        style={{height: 32, width: 32}}
        source={media}/>
      <Text style={CarmeraStyles.text}>{title}</Text>
      </VibrancyView>
      </Image>
      </TouchableOpacity>
      </View>
    )
  }


  pickImage () {
    ImagePickerManager.showImagePicker(ImageOptions, (response) => {
      if (response.didCancel) {
        return
      }
        let images = this.state.images
        const source = Platform.OS === 'ios'
                      ? {uri: response.uri.replace('file://', ''), isStatic: true, width: response.width, height: response.height}
                      : {uri: response.uri, isStatic: true, width: response.width, height: response.height}
        images.push (source)
        this.setState({images})
    });
  }

}
