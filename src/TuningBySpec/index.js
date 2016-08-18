'use strict'
import React, {
  Component,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import {fetchCarDetails} from '../reducers/tuning/filterActions'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Deals from '../tuning/Deals'
import PartsList from '../tuning/PartsList'
import BuildsList from '../tuning/BuildsList'
import {VRImage} from '../cardboard'

import F8Header from '../common/F8Header'
import {TuningBySpecStyles} from '../styles'

class TuningBySpec extends Component {

  componentWillMount () {
    let {specId} = this.props
    this.props.dispatch (fetchCarDetails(specId))
  }
  render () {
    console.log ('tuningbyspec, props=', this.props)
    let {specId} = this.props
    const leftItem = {title: 'Back', onPress: ()=> {
            Actions.pop ()
          }}
    return (
      <View style={{flex: 1}}>
      <F8Header
      foreground="dark"
      leftItem={leftItem} title="SPECS"/>
      <VRImage style={TuningBySpecStyles.VRImageHolder}/>
      </View>
    )
  }
}

export default connect () (TuningBySpec)
