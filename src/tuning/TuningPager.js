'use strict'

import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native'


import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

const specIdSelector = (state) => (state.stockCar.selectedSpecId)

import F8Header from '../common/F8Header'
import PartsList from '../tuning/PartsList'
import ScrollableTabView from 'react-native-scrollable-tab-view'

const mapStateToProps = (state) => {
  return {
    specId: specIdSelector (state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

class TuningPager extends Component {
  constructor (props) {
    super (props)
    this.state = {
      tuningTags: this.props.tuningTags,
      specId: this.props.specId
    }
  }
  render () {
    const leftItem = {
      title: 'Back',
      onPress: Actions.pop
    }

    return (
      <View style={{flex: 1}}>
      <F8Header leftItem={leftItem} foreground="dark"/>
      <ScrollableTabView
        locked={true}
        tabBarUnderlineColor="orange"
        tabBarActiveTextColor="orange"
        tabBarInactiveTextColor="black">
      {
        this.state.tuningTags.map ((tagName, idx) => (<PartsList key={`$tp-{idx}`} tabLabel={`#${tagName}`} tag={tagName} specId={this.state.specId}/>))
      }
      </ScrollableTabView>
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (TuningPager)
