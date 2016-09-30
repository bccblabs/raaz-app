'use strict'

import React, {
  Component,
  PropTypes,
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native'

import {Specs, GraphColorsArray} from '../styles'
import numeral from 'numeral'
import Icon from 'react-native-vector-icons/EvilIcons'
import {Heading3} from '../common/F8Text'
import keys from 'lodash/keys'
const window = Dimensions.get ('window')
const maxWidth = 300
const scalars = {
  'city': 5,
  'displacement': 1/20,
  'horsepower': 1/2.5,
  'torque': 1/2.5,
  'highway': 5,
  'max_hp_rpm': 1/20,
  'max_tq_rpm': 1/20,
  'baseMSRP': 1/100,
  'usedTmvRetail': 1/100,
  'usedPrivateParty': 1/100,
  'usedTradeIn': 1/100,
  'baseInvoice': 1/100,
  'compressionRatio': maxWidth/20,
  'cylinder': 10,
  'cargo_capacity': 10,
  'wheel_base': 2,
  'turning_diameter':10,
  'zero_sixty': 50,
  'ground_clearance': 20,
  'curb_weight': 1/20,
  'drag': 100,
  'fuel': 10,
  'depreciation': 1/100,
  'repairs': 1/100,
  'maintenance': 1/100,
  'insurance': 1/100,
  'invoice': 1/100,
  'msrp': 1/100,
  'mileage': 1/100,

  'tqGain': 15,
  'hpGain': 15,
  'maxHp': 1/2,
  'maxTq': 1/2,
  'labor': 20,
  'weight': 10,
  'rearLowering': 20,
  'frontLowering': 20,
  'rearSpringRateStiffness': 20,
  'frontSpringRateStiffness': 20

}

export default class MetricsGraph extends Component {
  constructor (...args) {
    super (...args)
    let entries = this.props.data[0]
      , firstPageData = this.getWidth (entries)
    this.state = {
      currentIndex: 0,
      entriesOnDisplay: firstPageData,
      data: Object.assign (...this.props.data[0].entries.map ((item=>({[item['name']]:item['value']} ))) )
    }
  }

  _parseLabelName (name) {
    switch (name) {
      case 'horsepower':
        return 'Horsepower (hp)'
      case 'torque':
        return 'Torque (lb/ft)'
      case 'city':
        return 'City MPG'
      case 'highway':
        return 'Highway MPG'
      case 'displacement':
        return 'Displacement (cc)'
      case 'max_hp_rpm':
        return 'Max Horsepower RPM'
      case 'max_tq_rpm':
        return 'Max Torque RPM'
      case 'baseMSRP':
        return 'Base MSRP ($)'
      case 'baseInvoice':
        return 'Base Invoice ($)'
      case 'usedTmvRetail':
        return 'Used Retail By Edmunds True Market Value ($)'
      case 'usedPrivateParty':
        return 'Used Private Seller By Edmunds ($)'
      case 'usedTradeIn':
        return 'Used Trade-In By Edmunds ($)'
      case 'compressionRatio':
        return 'Compression Ratio'
      case 'cylinder':
        return 'Cylinders'
      case 'cargo_capacity':
        return 'Cargo Capacity (cubic inches)'
      case 'wheel_base':
        return 'Wheel Base (ft)'
      case 'turning_diameter':
        return 'Turning Diameter'
      case 'zero_sixty':
        return '0-60 MPH (s)'
      case 'ground_clearance':
        return 'Ground Clearance'
      case 'curb_weight':
        return 'Curb Weight'
      case 'drag':
        return 'Drag'
      case 'fuel':
        return '5-Year Fuel Cost ($)'
      case 'depreciation':
        return '5-Year Depreciation Cost ($)'
      case 'repairs':
        return '5-Year Repairs Cost ($)'
      case 'maintenance':
        return '5-Year Maintenance Cost ($)'
      case 'insurance':
        return '5-Year Insurance Cost ($)'
      case 'invoice':
        return 'Dealer Invoice Price ($)'
      case 'msrp':
        return 'Dealer MSRP ($)'
      case 'mileage':
        return 'Mileage'
      case 'interior_vol':
        return 'Interior Volume (cubic inches)'
      case 'tqGain':
        return 'Torque Gain (LB/FT)'
      case 'hpGain':
        return 'Horsepower Gain (HP)'
      case 'maxHp':
        return 'Maximum Horsepower (HP)'
      case 'maxTq':
        return 'Maximum Torque (LB/FT)'
      case 'labor':
        return 'Labor (Hours)'
      case 'weight':
        return 'Weight (LB)'
      case 'rearLowering':
        return 'Rear Lowering (inches)'
      case 'frontLowering':
        return 'Front Lowering (inches)'
      case 'rearSpringRateStiffness':
        return 'Rear Spring Stiffness Rate (%)'
      case 'frontSpringRateStiffness':
        return 'Front Spring Stiffness Rate (%)'
      default:
        console.error ('key not defined', name)
        return name
    }
  }

  getWidth (data) {
    let entryWidth = {}, widthCap
    for (let i = 0; i < data.entries.length; i++) {
      let entryName = data.entries[i].name
      let entryValue = data.entries[i].value
      widthCap = entryValue * scalars[entryName] || 10
      if (entryValue)
        entryWidth [entryName] = Math.abs((widthCap <= maxWidth) ? widthCap:(maxWidth-50))
    }
    return entryWidth
  }

  handleAnimation (idx) {
    const currentDataWidth = this.getWidth (this.props.data[idx]),
          {val0, val1} = this.state,
          timing = Animated.timing,
          valuesMap = {}

    Animated.parallel ([val0, val1].map ((item, idx)=>{
      return timing (this.state[`val${idx}`], {toValue: currentDataWidth[`val${idx}`]})
    })).start ()
    this.setState ({currentIndex: idx})
  }

  render () {
    const {currentIndex, entriesOnDisplay, data} = this.state
    return (
          <View style={Specs.container}>
          {
            entriesOnDisplay && keys (entriesOnDisplay).map ((entryKey, idx)=>{
              let dataEntry = entriesOnDisplay[entryKey]
                , labelName = this._parseLabelName (entryKey)
                , labelValue = numeral(data[entryKey]).format('0,0')
            return (
              <View style={Specs.item} key={idx}>
                <Heading3 style={Specs.subtitle}>{labelName}</Heading3>
                <View style={Specs.data}>
                  <Animated.View style={[Specs.bar, GraphColorsArray[idx%GraphColorsArray.length], {width: dataEntry}]}/>
                  <Heading3 style={Specs.subtitle}>{labelValue}</Heading3>
                </View>
              </View>
              )
            })
          }
          </View>
    )
  }
}
