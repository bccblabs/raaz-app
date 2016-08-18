'use strict'

import React, {Component, View} from 'react-native'
import deepEqual from 'deep-equal'
import PureListView from '../common/PureListView'
import EventItem from './EventItem'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {EmptyViewStyles} from '../styles'
import {EmptyHeading} from '../common/F8Text'

class EventList extends Component {
  _innerRef: ?PureListView

  constructor (props) {
    super (props)
    this._innerRef = null
    this.renderRow = this.renderRow.bind (this)
    this.storeInnerRef = this.storeInnerRef.bind (this)
    this._renderEmptyList = this._renderEmptyList.bind (this)
  }

  _renderEmptyList () {
    return (
      <View style={EmptyViewStyles.container}>
        <EmptyHeading style={EmptyViewStyles.text}>
        {"No events found, try search or reloading again..."}
        </EmptyHeading>
      </View>
    )
  }

  render () {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={[]}
        renderEmptyList={this._renderEmptyList}
        renderRow={this.renderRow}
        {...this.props}
      />
    )
  }

  renderRow (eventData, rowId) {
    return (
      <EventItem key={rowId} data={eventData || {}} onPress={()=>Actions.EventDetails ({...eventData})}/>
    )
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref
  }


  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args)
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder()
  }
}

export default connect () (EventList)
