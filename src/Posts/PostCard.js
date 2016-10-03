'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  PropTypes,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import moment from 'moment'
import {PartStyles} from '../styles'

export default class PostCard extends Component {
  render () {
    let {labels, created, name, media, buildId, postId, title} = this.props.data
    return (
      <View style={PartStyles.partContainer}>
      <TouchableWithoutFeedback onPress={()=>{Actions.BuildDetails ({buildId})}}>
        <Image
          source={{uri: media[0]}}
          style={PartStyles.partImage}>
        </Image>
      </TouchableWithoutFeedback>
      <Text style={PartStyles.partTitle}>{name}</Text>
      </View>
    )
  }
}
