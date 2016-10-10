'use strict'
import React, {Component, View} from 'react-native'
import F8Button from '../common/F8Button'

import {connect} from 'react-redux'
import {isPartSavedSelector} from '../selectors'
import {toggleSaveProduct} from '../reducers/history/historyActions'
import {General} from '../styles'
const mapStateToProps = (state, props) => {
  return {
    isSaved: isPartSavedSelector (state, props),
    part: props.part,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSaveProduct: (part) => {dispatch (toggleSaveProduct (part))}
  }
}

class SaveProductButton extends Component {
  render () {
    let {isSaved, part, toggleSaveProduct} = this.props
    console.log (part)
    if (isSaved) {
      return (
        <F8Button
          style={[General.bottomButtonStyle, {backgroundColor: 'blue'}]}
          type="saved" caption="Saved!"
          onPress={()=>toggleSaveProduct (part)}
        />)
    } else {
      return (
        <F8Button
          style={[General.bottomButtonStyle, {backgroundColor: 'red'}]}
          type="unsaved" caption="Save"
          onPress={()=>toggleSaveProduct (part)}
        />)
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (SaveProductButton)
