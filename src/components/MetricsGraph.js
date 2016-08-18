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
import {Styles, GraphColorsArray} from '../styles'
var numeral = require ('numeral')
const window = Dimensions.get ('window')
const maxWidth = 350
const scalars = {
  'city': 5,
  'displacement': 1/20,
  'horsepower': 1/3,
  'torque': 1/3,
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
}

var Icon = require('react-native-vector-icons/EvilIcons');

export default class MetricsGraph extends Component {
  constructor (...args) {
    super (...args)
    let firstPageData = this.getWidth (this.props.data[0])

    this.state = {
      currentIndex: 0,
      val0: new Animated.Value(firstPageData['val0']?firstPageData['val0']:0),
      val1: new Animated.Value(firstPageData['val1']?firstPageData['val1']:0),
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
      default:
        console.log ('key not defined', name)
        return name
    }
  }
  getWidth (data) {
    let entryWidth = {}, widthCap
    for (let i = 0; i < 3; i++) {
      let entryName = data&&data.entries&&data.entries[i]?data.entries[i].name:''
      let entryValue = data&&data.entries&&data.entries[i]?data.entries[i].value:0
      widthCap = entryValue * scalars[entryName] || 10
      entryWidth [`val${i}`] = (widthCap <= maxWidth) ? widthCap:(maxWidth-50)
    }
    return entryWidth
  }

  onPressLeft () {
    const {currentIndex} = this.state,
          {data} = this.props
    if (currentIndex < data.length - 1) this.handleAnimation(currentIndex + 1)
  }

  onPressRight () {
    const {currentIndex} = this.state
    if (currentIndex > 0) this.handleAnimation(currentIndex - 1)
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
    const {currentIndex, val0, val1} = this.state,
          {data} = this.props,
          dataOnDisplay = data[currentIndex],
          entriesOnDisplay = this.getWidth (dataOnDisplay),
          canNext = currentIndex < this.props.data.length - 1 ? 1 : 0,
          canPrev = currentIndex > 0 ? 1 : 0

    return (
      <View style={styles.container}>
          <View style={{height: 80, marginTop: 4}}>
          {
            dataOnDisplay && entriesOnDisplay && [val0, val1].map ((itemValue, idx)=>{
              let dataEntry = dataOnDisplay.entries[idx],
                  labelName = dataEntry?this._parseLabelName (dataEntry['name']):'',
                  labelValue = dataEntry?numeral(dataEntry['value']).format ('0,0'):''
              return (
                itemValue && <View style={styles.item} key={idx}>
                <Text style={styles.dataNumber}>{labelName}</Text>
                <View style={styles.data}>
                      <Animated.View style={[styles.bar, GraphColorsArray[currentIndex%GraphColorsArray.length], {width: itemValue}]}/>
                      <Text style={styles.dataNumber}>{labelValue}</Text>
                </View>
                  </View>
              )
            })
          }
          </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6,
    justifyContent: 'center'
  },
  // Item
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  label: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 16,
    position: 'relative',
    top: 2
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataLabel: {
    color: 'black',
    fontSize: 14
  },
  dataNumber: {
    color: 'black',
    fontSize: 12
  },
  // Bar
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 20,
    marginRight: 5
  },
    // controller
  controller: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  button: {
    flex: 1,
    position: 'relative',
    top: -1
  },
  chevronLeft: {
    alignSelf: 'flex-end',
    height: 28,
    marginRight: 10,
    width: 28
  },
  chevronRight: {
    alignSelf: 'flex-start',
    height: 28,
    marginLeft: 10,
    width: 28
  },
  date: {
    color: '#6B7C96',
    flex: 1,
    fontSize: 22,
    fontWeight: '300',
    height: 28,
    textAlign: 'center'
  }

})
