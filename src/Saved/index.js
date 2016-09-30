'use strict'
import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import F8Header from '../common/F8Header'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import SavedPartsList from './SavedPartsList'
import SavedBuildsList from './SavedBuildsList'

export default class TuningPager extends Component {

  render () {
    const leftItem = {
      title: 'Back',
      onPress: Actions.pop
    }

    return (
      <View style={{flex: 1}}>
      <F8Header leftItem={leftItem} foreground="dark" title="Watch List"/>
      <ScrollableTabView
        locked={true}
        tabBarUnderlineColor="orange"
        tabBarActiveTextColor="orange"
        tabBarInactiveTextColor="black">
        <SavedPartsList key="saved-parts" tabLabel="Parts"/>
        <SavedBuildsList key="saved-builds" tabLabel="Builds"/>
      </ScrollableTabView>
      </View>
    )
  }
}
