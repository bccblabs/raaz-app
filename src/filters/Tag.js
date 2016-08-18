'use strict'
import React, {
  Animated,
  Component,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {connect} from 'react-redux'

class Tag extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selected: this.props.selected
    }
    this._onPressTag = this._onPressTag.bind (this)
  }

  _onPressTag () {
    let {action, dispatch} = this.props,
        toggleSelect = !this.state.selected
    console.log ('tag pressed', action, dispatch)
    dispatch (action)
    this.setState ({selected: toggleSelect})
  }

  componentWillReceiveProps (nextProps) {
    let selectedVal = nextProps.selected
    this.setState ({selected: selectedVal})
  }

  render () {
    let {title, imageUrl, touchEnabled} = this.props,
        {selected} = this.state,
        {deselectedStyle, selectedStyle, deselectedLabel, selectedLabel} = styles,
        tagStyle = (touchEnabled && selected)?selectedStyle:deselectedStyle,
        labelStyle = (touchEnabled && selected)?selectedLabel:deselectedLabel
    return (<View style={tagStyle}>
              <TouchableWithoutFeedback onPress={this._onPressTag}>
                <Text style={labelStyle}>{title}</Text>
              </TouchableWithoutFeedback>
            </View>)

  }
}

const styles = StyleSheet.create({
  deselectedStyle: {
    padding: 5,
    margin: 4,
    borderRadius: 5,
    borderWidth: 1.3,
    borderColor: 'white',
    backgroundColor: 'transparent'
  },
  selectedStyle: {
    padding: 5,
    margin: 4,
    borderRadius: 5,
    borderWidth: 1.3,
    borderColor: 'red',
    backgroundColor: 'transparent'
  },
  deselectedLabel: {
    color: 'white',
    fontSize: 8,
  },
  selectedLabel: {
    color: 'red',
    fontSize: 8,
  }
})
export default connect () (Tag)
