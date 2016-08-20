'use strict'
import React, {
  Component,
  PropTypes,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'

import LinearGradient from 'react-native-linear-gradient';
import Metro from 'react-native-metro-grid'
import moment from 'moment'

import ProfilePicture from '../common/ProfilePicture'
import F8Button from '../common/F8Button'

import {PostStyles} from '../styles'

export default class Post extends Component {
  constructor (...args) {
    super (...args)
    this.state = {
      addToCompare: false
    }
  }

  componentWillMount () {
    this.setState ({addToCompare: this.props.addToCompare})
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
    let imageContent

    if (media.length > 3) {
    } else if (media.length > 1) {

    } else {
      imageContent = (
        <Image style={PostStyles.singlePostImage} source={{uri: media[0]}}>
          <View style={PostStyles.header}>
            <Image source={{uri:user.picture}} style={PostStyles.userPhotoStyle}/>
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text style={PostStyles.authorName}>{`${user.name}`}</Text>
                <Text style={PostStyles.created}>{`Posted ${daysAgo}`}</Text>
              </View>
          </View>
          <View style={PostStyles.tags}>
          {tags && tags.map ((tag, idx)=> {return ( <Text key={idx} style={PostStyles.tag}>{`#${tag}`}</Text> )})}
          </View>
        </Image>
      )
    }

    return (
        <View style={PostStyles.container}>
          {title && (<Text style={PostStyles.title}>{'YOOO'}</Text>)}
          {imageContent}
        </View>
    )
  }
}
