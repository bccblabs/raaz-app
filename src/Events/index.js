'use strict'
import React, {
  Component,
  View
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import {toggleEventTag} from '../reducers/events/eventActions'

import EventList from './EventList'

import F8Header from '../common/F8Header'
import TagsHeader from '../common/TagsHeader'

class Events extends Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  render () {
    const leftItem = {
            title: 'My Events',
            onPress: ()=>Actions.MyEvents()
          }
    return (
      <View>
      <F8Header title="Events" foreground='dark' leftItem={leftItem}/>
      <TagsHeader color="#008AC9" tagAction={toggleEventTag} tags={['#show', '#track', '#street', '#jdm', '#muscle', '#euro']}/>
      <EventList/>
      </View>
    )
  }
}

export default connect () (Events)
