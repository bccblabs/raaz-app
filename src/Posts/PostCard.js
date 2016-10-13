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
import {PostStyles} from '../styles'

export default class PostCard extends Component {
  render () {
    let {labels, created, name, media, buildId, postId, title} = this.props.data
    return (
      <TouchableWithoutFeedback onPress={()=>{Actions.BuildDetails ({buildId})}}>
        <Image
          source={{uri: media[0]}}
          style={PostStyles.secondaryImage}>
          <Text style={PostStyles.secondaryTitle}>{name}</Text>
        </Image>
      </TouchableWithoutFeedback>
    )
  }
}
