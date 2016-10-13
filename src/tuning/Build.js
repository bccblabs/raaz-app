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
import { Col, Row, Grid } from "react-native-easy-grid";

import moment from 'moment'
import Icon from 'react-native-vector-icons/Foundation';
import {PostStyles, PartStyles} from '../styles'
import numeral from 'numeral'

import LikeBtn from '../common/LikeBtn'
import CommentBtn from '../common/CommentBtn'

export default class Post extends Component {

  constructMetroGridItems (media) {
    if (media.length === 1)
    return {rowItems: [{type: 11, row: media}]}
  }

  render () {
    if (!this.props.data) return <View/>
    const {created, name, manufacturers, media, tags, buildId, likes, comments, parts} = this.props.data,
          daysAgo = moment(created).fromNow()

    , imageContent = (
      <Image style={PostStyles.primaryImage} source={{uri: media}}>
      <Text style={PostStyles.primaryTitle}>{name}</Text>
      <View style={PostStyles.manufacturerContainer}>
      {
        manufacturers && manufacturers.map ((logo, idx)=> {
          return (<Image
            key={idx}
            source={{uri: logo}}
            style={PostStyles.manufacturerLogo}
            />)
          })
      }
      </View>

      </Image>
    )

    , tagsContent = tags && (
          <ScrollView style={PostStyles.tags} showsHorizontalScrollIndicator={false} horizontal={true} containerStyle={PostStyles.tagsContainer}>
            {tags && tags.map ((tag, idx)=> {return ( <Text key={idx} style={PostStyles.tag}>{`#${tag}`}</Text> )})}
          </ScrollView>
      )
    , partContent = parts && (
      <ScrollView style={{backgroundColor: 'white'}} pagingEnabled={true}
      horizontal={true} showsHorizontalScrollIndicator={false}>
      {parts.map((part, idx)=>{
        return (
          <View key={`psp-${idx}`} style={PostStyles.scrollTitleContainer}>
          <Text style={PartStyles.partTitle}>{part}</Text>
          </View>
        )})
      }
      </ScrollView>

    )
    , likesContent = (<LikeBtn postId={buildId} numlikes={likes.length}/>)
    , commentsContent = (<CommentBtn postId={buildId} commentsCnt={comments}/>)

    return (
      <View style={PostStyles.container}>
      <TouchableWithoutFeedback onPress={()=>Actions.BuildDetails({buildId: buildId, name: name})}>
      {imageContent}
      </TouchableWithoutFeedback>
      {tagsContent}
      {partContent}
      <View style={{flexDirection:"row", justifyContent: 'flex-start'}}>
      {likesContent}
      {commentsContent}
      </View>
      </View>
    )
  }
}
