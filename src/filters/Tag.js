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
                <Text style={labelStyle}>{`#${title}`}</Text>
              </TouchableWithoutFeedback>
            </View>)

  }
}

const styles = StyleSheet.create({
  deselectedStyle: {
    padding: 3,
    margin: 3,
    borderRadius: 5,
    borderWidth: 1.8,
    borderColor: 'gray',
    backgroundColor: 'transparent'
  },
  selectedStyle: {
    padding: 3,
    margin: 3,
    borderRadius: 5,
    borderWidth: 1.8,
    borderColor: 'white',
    backgroundColor: 'transparent'
  },
  deselectedLabel: {
    color: 'gray',
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '500',
  },
  selectedLabel: {
    color: 'white',
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '500',
  }
})
export default connect () (Tag)
