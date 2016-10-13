'use strict'
import React, {
  Component,
  PropTypes,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'


import numeral from 'numeral'

import {Actions} from 'react-native-router-flux'
import {Heading2, Text} from '../common/F8Text'

import {Utils} from '../utils'
import ProfilePicture from '../common/ProfilePicture'
import PartDetails from './PartDetails'
import {Specs, PostStyles} from '../styles'
import intersection from 'lodash/intersection'
export default class Part extends Component {
  constructor (...args) {
    super (...args)
  }

  render () {
    const {data, specId} = this.props
        , {included, media, name} = data
        , keysArray = [
          'tqGain', 'hpGain', 'maxHp', 'maxTq', 'labor', 'weight',
          'rearLowering', 'frontLowering',
          'rearSpringRateStiffness','frontSpringRateStiffness'
        ]
        , specsArray = intersection (keysArray, Object.keys(data)).map ((key)=>{return {name: Utils.parseLabelName(key), value: data[key]}})
        , imageContent = (
          <Image source={{uri: media}} resizeMode="contain" style={PostStyles.primaryImage}>
          <Text style={PostStyles.primaryTitle}>{name}</Text>
          </Image>
        )
        , partContent = (
          <ScrollView style={{backgroundColor: 'white'}} pagingEnabled={true}
          horizontal={true} showsHorizontalScrollIndicator={false}>
          {specsArray.map((rec, idx)=>{
            return (
              <View key={`psp-${idx}`} style={PostStyles.scrollTitleContainer}>
              <Text style={Specs.subtitle1}>{rec.name}</Text>
              <Text style={Specs.subtitle2}>{rec.value}</Text>
              </View>
            )})
          }
          </ScrollView>
        )
    return (
      <View style={PostStyles.container}>
      <TouchableOpacity onPress={()=>{Actions.PartDetails({data: Object.assign (data, {specId})})}}>
      {imageContent}
      </TouchableOpacity>
      {partContent}
      </View>
    )
  }
}
