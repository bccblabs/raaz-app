'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import BuildsList from '../tuning/BuildsList'
import Carmera from '../components/Carmera'
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'

export default class Tuning extends Component {
  render () {
    const leftItem = {title: 'Saved', onPress:Actions.WatchList}
        , rightItem = {title: 'Orders', onPress: Actions.Orders}

    return (
      <View style={{flex: 1, backgroundColor:'transparent'}}>
      <F8Header title="Tuning" foreground='dark' leftItem={leftItem} rightItem={rightItem}/>
      <Carmera/>
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <TouchableOpacity
          accessibilityLabel="Clear filter"
          accessibilityTraits="button"
          style={styles.clear}
          onPress={Actions.Makes}>
          <Text style={styles.text}>{("Tuning By Car").toUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Clear filter"
          accessibilityTraits="button"
          style={styles.clear}
          onPress={()=>Actions.BuildFilter({filterId: 'car'})}>
          <Text style={styles.text}>{("Filter Builds").toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <BuildsList/>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    opacity: 0.6,
    justifyContent: 'center'
  },
  text: {
    fontSize: 10,
    color: 'black',
    letterSpacing: 1,
    alignSelf: 'center',
    textDecorationLine: 'underline'
  },
  clear: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  header: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: 'black',
    opacity: 0.6,
  },
})
