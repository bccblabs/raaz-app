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
import {EmptyHeading} from '../common/F8Text'
import ProfilePicture from '../common/ProfilePicture'
import ResponsiveImage from 'react-native-responsive-image'
import Icon from 'react-native-vector-icons/Foundation';
import {PostStyles} from '../styles'
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
    const {created, name, manufacturers, listing, media, tags, buildId, likes, comments} = this.props.data,
          daysAgo = moment(created).fromNow()
    let manufacturerContent = manufacturers && (
              <View>
              {manufacturers.map ((item, idx)=> {return item.logo?(<Image key={idx} source={{uri: item.logo}} style={{margin: 8, height:20, resizeMode: 'contain'}}/>):(<View/>)})}
              </View>
      )
    , imageContent = (
      <View style={{flex: 1}}>
        <View style={PostStyles.header}>
          {listing && <Icon name="price-tag" size={20} color={"red"}/>}
          {name && (<Text style={PostStyles.title}>{name}</Text>)}
          <Text style={PostStyles.created}>{`${daysAgo}`}</Text>
        </View>
        {manufacturerContent}
        <Grid style={PostStyles.imageContainer}>
          <Col>
            <Image source={{uri:media[0]}} style={PostStyles.largeImage}/>
          </Col>
          <Col>
            <Row>
            <Image source={{uri:media[1]}} style={PostStyles.smallImage}/>
            </Row>
            <Row>
            <Image source={{uri:media[2]}} style={PostStyles.smallImage}/>
            </Row>
          </Col>
        </Grid>
      </View>
    )
    , tagsContent = tags && (
          <ScrollView style={PostStyles.buildtags} showsHorizontalScrollIndicator={false} horizontal={true} containerStyle={PostStyles.tagsContainer}>
            {tags && tags.map ((tag, idx)=> {return ( <Text key={idx} style={PostStyles.tag}>{`#${tag}`}</Text> )})}
          </ScrollView>
      )
    , likesContent = (<LikeBtn postId={buildId} numlikes={likes.length}/>)
    , commentsContent = (<CommentBtn postId={buildId} commentsCnt={comments}/>)

    return (
      <TouchableWithoutFeedback onPress={()=>Actions.BuildDetails({buildId: buildId, name: name})}>
        <View style={PostStyles.container}>
          {imageContent}
          {tagsContent}
          <View style={{flexDirection:"row", justifyContent: 'flex-start'}}>
          {likesContent}
          {commentsContent}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
