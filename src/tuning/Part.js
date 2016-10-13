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
import {Specs} from '../styles'
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

    return (
      <View>
      <TouchableOpacity onPress={()=>{Actions.PartDetails({data: Object.assign (data, {specId})})}}>
        <View style={{backgroundColor: 'white', margin: 8, marginBottom: 0, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
          <Image source={{uri: media}} resizeMode="contain" style={{height:60, width: 60, margin: 8}}/>
          <Text numberOfLines={3} style={styles.title}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView style={{marginHorizontal: 8, backgroundColor: 'white'}} pagingEnabled={true}
      horizontal={true} showsHorizontalScrollIndicator={false}>
      {specsArray.map((rec, idx)=>{
        return (
          <View key={`psp-${idx}`} style={{width: 120,padding: 6, backgroundColor: 'white', borderWidth: 0.5, borderColor: 'lightgray'}}>
          <Text style={Specs.subtitle1}>{rec.name}</Text>
          <Text style={Specs.subtitle2}>{rec.value}</Text>
          </View>
        )})
      }
      </ScrollView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  title: {
    flex: 1,
    alignSelf: 'flex-start',
    color: 'black',
    fontWeight: '600',
    padding: 16,
    fontSize: 12
  }
})
