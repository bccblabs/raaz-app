'use strict'
import React, {
  Component,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import CategoryFilters from '../components/CategoryFilters'
import {Actions} from 'react-native-router-flux'
import {togglePartTag} from '../reducers/tuning/filterActions'

export default class BuildFilter extends Component {
  render () {
    const leftItem = {title: 'Back', onPress: ()=>{Actions.pop()}}
        , {filterId, title} = this.props
    return (
      <View style={{flex: 1}}>
      <F8Header title={title.toUpperCase()} foreground='dark' leftItem={leftItem} />
      <F8Button onPress={Actions.SearchTuning}
                caption="search" type="search"
                icon={require ('../common/img/search.png')}/>
      <CategoryFilters filterId={filterId} title={title} toggleAction={togglePartTag}/>
      </View>
    )
  }
}
