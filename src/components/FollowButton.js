'use strict'
import React, {Component, View} from 'react-native'
import F8Button from '../common/F8Button'

import {connect} from 'react-redux'
// import {isFollowing} from '../selectors'
import {toggleFollow} from '../reducers/history/historyActions'
import {General} from '../styles'

const mapStateToProps = (state, props) => {
  return {
    // isFollowing: isFollowing (state, props),
    isFollowing: true,
    id: props.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFollow: (id) => {dispatch (toggleFollow (id))}
  }
}

class FollowButton extends Component {
  render () {
    let {isFollowing, id, toggleFollow} = this.props
    if (isFollowing) {
      return (
        <F8Button
          style={[General.bottomButtonStyle, {backgroundColor: 'red'}]}
          type="saved" caption="Following!"
          onPress={()=>toggleFollow (id)}
        />)
    } else {
      return (
        <F8Button
          style={[General.bottomButtonStyle, {backgroundColor: 'white'}]}
          type="unsaved" caption="Follow"
          onPress={()=>toggleFollow (id)}
        />)
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (FollowButton)
