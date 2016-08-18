'use strict'
import React, {
  Component,
  PropTypes,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'


import {PostStyles} from '../styles'
import {Actions} from 'react-native-router-flux'
import Metro from 'react-native-metro-grid'
import ProfilePicture from '../common/ProfilePicture'
import moment from 'moment'
import F8Button from '../common/F8Button'

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
      imageContent = (<Image style={PostStyles.singlePostImage} source={{uri: media[0]}}/>)
    }

    return (
        <View style={PostStyles.container}>
          {title && (<Text style={PostStyles.title}>{'YOOO'}</Text>)}
          <View style={PostStyles.header}>
            <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={PostStyles.authorName}>{`${user.name}`}</Text>
            <Text style={PostStyles.created}>{`Posted ${daysAgo}`}</Text>
            </View>
            <Image source={{uri:user.picture}} style={{height: 50, width: 50, resizeMode: 'contain'}}/>
          </View>
          {imageContent}
          <View style={PostStyles.tags}>
          {tags && tags.map ((tag, idx)=> {return ( <Text key={idx} style={PostStyles.tag}>{`#${tag}`}</Text> )})}
          </View>
          <View style={PostStyles.tags}>
          </View>
        </View>
    )
  }
}
