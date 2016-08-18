'use strict'
import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  PropTypes
} from 'react-native'

import {Styles, ScrollColorsArray, ScrollColorsNum} from '../styles'

export default class HorizontalScrollContainer extends Component {
  render () {
      let {dataArray} = this.props

      return (
      <ScrollView showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={this.props.scrollViewStyle}
                  contentContainerStyle={this.props.contentContainerStyle}>
      {dataArray && dataArray.map ((item, idx)=> {
        return (
          <View>
            {this.props.renderItem(item, idx)}
          </View>
        )
      })}
      </ScrollView>
    )
  }
}


HorizontalScrollContainer.PropTypes = {
  dataArray: PropTypes.array.isRequired
}
