'use strict'

import React, {
  Component,
  View,
  ScrollView,
  Text
} from 'react-native'

import { btnColor, Titles, Header } from '../styles'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {savedSpecsSelector} from '../selectors'
import F8Button from '../common/F8Button'
import {Heading3} from '../common/F8Text'

const mapStateToProps = (state) => {
  return {
    savedSpecs: savedSpecsSelector (state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch}
}

class SpecsHistoryHeader extends Component {
  render () {
    let {savedSpecs} = this.props
    return (
      <View>
      {savedSpecs.length > 0 && (
        <View style={[Header.container]}>
        <Text style={[Header.clear, Header.title]}>{"Recent Searches"}</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={false}
          style={{marginHorizontal: 8}}
          contentContainerStyle={{justifyContent: 'center'}}>
          { savedSpecs.map ((car, idx)=> {
            return (<F8Button
                      key={`cartag-${idx}`}
                      type="spec"
                      onPress={()=>{Actions.TuningBySpec ({specId: car.specId})}}
                      caption={`${car.make} ${car.model} ${car.submodel} - ${car.horsepower}HP`}
                      style={{margin: 4, height: 30}}/>)
          })
          }
        </ScrollView>
        </View>
      )
      }
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (SpecsHistoryHeader)
