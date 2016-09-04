'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  PropTypes,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {Grid, Col} from 'react-native-grid'

import moment from 'moment'
import {EmptyHeading} from '../common/F8Text'

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
    const {created, name, manufacturer, listing, media, tags} = this.props.data,
          daysAgo = moment(created).fromNow()

    let imageContent
    imageContent = (
      <View style={{flex: 1}}>
      <View style={PostStyles.header}>
          <Text style={PostStyles.created}>{`${daysAgo}`}</Text>
          <ScrollView horizontal={true} style={{height: 200}}>
          {manufacturer && manufacturer.map ((manu, idx)=>{
            return (
              <View style={{flexDirection: 'column'}}>
                <Image source={{uri:manu.logo}} style={{height: 100, width: 200, resizeMode: 'contain'}}/>
                <Text style={PostStyles.authorName}>{name}</Text>
              </View>
            )
          })}
          </ScrollView>
      </View>
      <Grid style={{height: 200, width: 400}}>
        <Col span={11}>
        <Image source={{uri:media[0]}} style={{height: 200, width: 200, resizeMode: 'contain'}}/>
        </Col>
        <Col span={21}>
        <Image source={{uri:media[1]}} style={{height: 100, width: 100, resizeMode: 'contain'}}/>
        </Col>
        <Col span={22}>
        <Image source={{uri:media[2]}} style={{height: 100, width: 100, resizeMode: 'contain'}}/>
        </Col>
      </Grid>
      <View style={PostStyles.tags}>
        {tags && tags.map ((tag, idx)=> {return ( <Text key={idx} style={PostStyles.tag}>{`#${tag}`}</Text> )})}
      </View>
      </View>
    )
    return (
        <View style={PostStyles.container}>
          {name && (<Text style={PostStyles.title}>{name}</Text>)}
          {imageContent}
        </View>
    )
  }
}
