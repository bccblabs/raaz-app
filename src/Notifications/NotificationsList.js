'use strict'
import React, {Component, View} from 'react-native'
import {connect} from 'react-redux'
import PureListView from '../common/PureListView'
import NotificationItem from './NotificationItem'
import {EmptyViewStyles} from '../styles'
import {EmptyHeading} from '../common/F8Text'
class NotificationsList extends Component {
  _innerRef: ?PureListView;

  constructor (props) {
    super (props)
    this.state = {
    }
    this._innerRef = null
    this.renderRow = this.renderRow.bind(this)
    this.storeInnerRef = this.storeInnerRef.bind(this)
    this._renderEmptyList = this._renderEmptyList.bind (this)
  }

  _renderEmptyList () {
    return (
        <View style={[EmptyViewStyles.container, {'flex': 1,'alignSelf': 'center','justifyContent': 'center'}]}>
          <EmptyHeading style={[EmptyViewStyles.text, {justifyContent: 'center'}]}>
          {"No notifications yet..."}
          </EmptyHeading>
        </View>
    )
  }

  render () {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={[]}
        renderRow={this.renderRow}
        renderEmptyList={this._renderEmptyList}
        {...this.props}
      />
    )
  }

  renderRow (notificationData, rowId) {
    return (
      <NotificationItem key={rowId} data={notificationData} onPress={()=>{console.log ('notification data')}}/>
    )
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }


  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }

}

export default connect () (NotificationsList)
