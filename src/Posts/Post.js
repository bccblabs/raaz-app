'use strict'
import React, {
  Component,
  Image,
  PropTypes,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'

import Metro from 'react-native-metro-grid'
import moment from 'moment'

import ProfilePicture from '../common/ProfilePicture'
import F8Button from '../common/F8Button'
import ResponsiveImage from 'react-native-responsive-image'
import {PostStyles} from '../styles'

export default class Post extends Component {
  constructor (...args) {
    super (...args)
  }

  constructMetroGridItems (media) {
    if (media.length === 1)
    return {rowItems: [{type: 11, row: media}]}
  }

  render () {
    if (!this.props.data) return <View/>
    const {post, tags, user} = this.props.data,
          {media, created, title} = post,
          daysAgo = moment(created).fromNow()
          , imageSize = media[0].split ('-')[1].split ('x')
          , initWidth = imageSize[0]
          , initHeight = imageSize[1]
    let imageContent
    imageContent = (
      <View style={{flex: 1}}>
      <View style={PostStyles.header}>
        {title && (<Text style={PostStyles.title}>{'YOOO'}</Text>)}
        <Image source={{uri:user.picture}} style={PostStyles.userPhotoStyle}/>
          <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
            <Text style={PostStyles.authorName}>{`${user.name}`}</Text>
            <Text style={PostStyles.created}>{`${daysAgo}`}</Text>
          </View>
      </View>
      <ResponsiveImage style={PostStyles.singlePostImage} source={{uri: media[0]}} initWidth={initWidth} initHeight={initHeight}/>
      <ScrollView style={PostStyles.tags} showsHorizontalScrollIndicator={false} horizontal={true} containerStyle={PostStyles.tagsContainer}>
        {tags && tags.map ((tag, idx)=> {return ( <Text key={idx} style={PostStyles.tag}>{`#${tag}`}</Text> )})}
      </ScrollView>
      </View>
    )
    return (
        <View style={PostStyles.container}>
          {imageContent}
          <View style={{flexDirection:"row", justifyContent: 'flex-start'}}>
          <F8Button style={{}} type="tuningSub" caption="10 likes"/>
          <F8Button style={{}} type="tuningSub" caption="10 comments"/>
          </View>
        </View>
    )
  }
}
