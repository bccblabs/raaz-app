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
import { Col, Row, Grid } from "react-native-easy-grid";

import moment from 'moment'
import {EmptyHeading} from '../common/F8Text'

import ProfilePicture from '../common/ProfilePicture'
import F8Button from '../common/F8Button'
import ResponsiveImage from 'react-native-responsive-image'
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Foundation';
import {PostStyles} from '../styles'
import numeral from 'numeral'

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
    const {created, name, manufacturers, listing, media, tags, buildId} = this.props.data,
          daysAgo = moment(created).fromNow()
    let imageContent = (
      <View style={{flex: 1}}>
        <View style={PostStyles.header}>
            {name && (<Text style={PostStyles.title}>{name}</Text>)}
            <Text style={PostStyles.created}>{`${daysAgo}`}</Text>
        </View>
        {listing && (
          <View style={PostStyles.listingSection}>
            <Icon name="price-tag" size={30} color={"red"}/>
            <Text style={PostStyles.price}>{`$${numeral(listing.amount).format ('0,0')} ${listing.currency}`}</Text>
          </View>
        )}
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
    , manufacturerContent = manufacturers && (
        <View>
        {manufacturers.map ((item, idx)=> {return item.logo?(<Image key={idx} source={{uri: item.logo}} style={{margin: 8, height:20, resizeMode: 'contain'}}/>):(<View/>)})}
        </View>
      )
    , tagsContent = tags && (
          <ScrollView style={PostStyles.buildtags} showsHorizontalScrollIndicator={false} horizontal={true} containerStyle={PostStyles.tagsContainer}>
            {tags && tags.map ((tag, idx)=> {return ( <Text key={idx} style={PostStyles.tag}>{`#${tag}`}</Text> )})}
          </ScrollView>
      )

    return (
        <View style={PostStyles.container}>
          {imageContent}
          {manufacturerContent}
          {tagsContent}
          <View style={{flexDirection:"row", justifyContent: 'space-between'}}>
          <F8Button style={{}} type="tuningSub" caption="Details" icon={require ('../common/img/ic_build.png')} onPress={()=>Actions.BuildDetails({buildId})}/>
          <F8Button style={{}} type="tuningSub" caption="10 likes" icon={require('../common/img/ic_thumb_up.png')} />
          <F8Button style={{}} type="tuningSub" caption="10 comments" icon={require ('../common/img/ic_comment.png')} />
          </View>
        </View>
    )
  }
}
