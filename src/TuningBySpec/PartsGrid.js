'use strict'
import React, {
  Component,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,

} from 'react-native'

import {Paragraph} from '../common/F8Text'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import isArray from 'lodash/isArray'
import {PartStyles} from '../styles'

class PartsGrid extends Component {
  constructor (props) {
    super (props)
  }

  render() {
    let {data, onPress, specId} = this.props
    return (
      <View style={{backgroundColor: 'white', marginBottom: 16}}>
        <View>
        {data.map ((optionRow, idx)=>{
          return (
            <View style={{backgroundColor: 'white'}} key={`pg-${idx}`}>
            <Paragraph style={PartStyles.partSectionTitle}>
            {optionRow.name.toUpperCase()}
            </Paragraph>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={PartStyles.partsScrollStyle}>
              {
                optionRow.options.map ((data, cidx)=> {
                  let {name, media, partId, recCnt} = data,
                      passProps = Object.assign ({}, data, {specId})

                  return (
                    <View key={`pelem-${cidx}`} style={PartStyles.partContainer}>
                    <TouchableWithoutFeedback onPress={()=>{Actions.PartDetails ({data: passProps})}}>
                      <Image
                        source={{uri: media}}
                        style={PartStyles.partImage}>
                      </Image>
                    </TouchableWithoutFeedback>
                    <Text style={PartStyles.partTitle}>{name}</Text>
                    <Text style={PartStyles.rating}>{recCnt?recCnt:'n/a' + ' Recommendations'}</Text>
                    </View>
                  )
                })
              }
            </ScrollView>
            </View>
          )
        })}
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default connect () (PartsGrid)
