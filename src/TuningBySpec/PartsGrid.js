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
import {SliderStyles, FilterStyles, Styles, FilterCardStyles} from '../styles'

class PartsGrid extends Component {
  constructor (props) {
    super (props)
  }

  render() {
    let {data, onPress, specId} = this.props
    return (
      <View style={[styles.container, {marginBottom: 16}]}>
        <View>
        {data.map ((optionRow, idx)=>{
          return (
            <View style={{backgroundColor: 'white'}} key={`pg-${idx}`}>
            <Paragraph style={SliderStyles.sliderTitle}>
            {optionRow.name.toUpperCase()}
            </Paragraph>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={SliderStyles.horizontalScrollContainer}
              contentContainerStyle={Styles.scrollContainer}>
              {
                optionRow.options.map ((data, cidx)=> {
                  let {name, media, partId} = data,
                      passProps = Object.assign ({}, data, {specId})

                  return (
                    <View style={{height:200, width: 200}}>
                    <TouchableWithoutFeedback style={{margin: 16}} key={`pg-${cidx}`} onPress={()=>{Actions.PartDetails ({data: passProps})}}>
                      <View style={FilterCardStyles.containerStyle}>
                        <Image
                          source={{uri: media}}
                          style={{height:200, width: 200, resizeMode: 'contain'}}>
                        </Image>
                      </View>
                    </TouchableWithoutFeedback>
                    <Text style={FilterCardStyles.partTextStyle}>{name}</Text>
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
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 35,
  }
})

export default connect () (PartsGrid)
