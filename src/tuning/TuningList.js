'use strict'
import React, {
  Component,
  Platform,
  Navigator,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import F8Button from '../common/F8Button'
import {mergeStockCarFilter, fetchBuilds, fetchParts, buildsUrl, partsUrl} from '../reducers/tuning/filterActions'

import BuildsList from './BuildsList'
import PartsList from './PartsList'
import ListContainer from '../common/ListContainer'
import {Styles} from '../styles'
import {range} from '../utils'
type Props = {
  navigator: Navigator
}

class TuningDetails extends Component {
  props: Props;

  constructor (props) {
    super (props)
  }

  componentWillMount () {
    let {make, model, years, trims, dispatch} = this.props
    this.props.dispatch (mergeStockCarFilter (make, model, years, trims, undefined, undefined))
    this.props.dispatch (fetchBuilds (buildsUrl))
    this.props.dispatch (fetchParts (partsUrl))
  }

  render () {
    let {make, model, headerImage, trims} = this.props
    const popItem = {
      title: 'Back',
      onPress: ()=>Actions.pop(),
    }

    let parallaxContent= (
      <View>
        <F8Button
          icon={require ('../common/img/filter.png')}
          type="tuning"
          caption={model[0] + " " + trims[0]}
          onPress={()=>{Actions.TuningFilter()}}
          style={[Styles.photoButton, {backgroundColor:'transparent'}]}
        />
        <View style={{flexDirection: 'row'}}>
          <F8Button
            type="tuningSub"
            caption={"Specs"}
            onPress={()=>{Actions.Makes()}}
            style={[Styles.photoButton, {backgroundColor:'transparent', alignSelf: 'flex-end'}]}
          />
          <F8Button
            type="tuningSub"
            caption={"Posts"}
            onPress={()=>{Actions.Makes()}}
            style={[Styles.photoButton, {backgroundColor:'transparent', alignSelf: 'flex-end'}]}
          />
          <F8Button
            type="tuningSub"
            caption={"For Sale"}
            onPress={()=>{Actions.Makes()}}
            style={[Styles.photoButton, {backgroundColor:'transparent'}]}
          />
        </View>
      </View>
    )

    return (
      <ListContainer
        stickyHeader={parallaxContent}
        backgroundColor="black"
        backgroundImage={require ('../images/tuning.jpg')}
        selectedSegment={0}
        leftItem={popItem}>
        <BuildsList
          title="Builds"/>
        <PartsList
          title="Parts"/>
      </ListContainer>
    )
  }
}

export default connect () (TuningDetails)
