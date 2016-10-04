'use strict'
import React, {
  Component,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import F8Header from '../common/F8Header'
import CategoryFilters from '../components/CategoryFilters'
import {Actions} from 'react-native-router-flux'
import {togglePartTag} from '../reducers/tuning/filterActions'

export default class BuildFilter extends Component {
  render () {
    const leftItem = {title: 'Back', onPress: ()=>{Actions.pop()}}
        , {filterId} = this.props
    return (
      <View style={{flex: 1}}>
      <F8Header title="Filter Parts" foreground='dark' leftItem={leftItem} />
      <CategoryFilters filterId={filterId} onPress={Actions.pop} toggleAction={togglePartTag}/>
      </View>
    )
  }
}
