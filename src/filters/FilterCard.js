'use strict'

import React, {
  Animated,
  Component,
  InteractionManager,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {connect} from 'react-redux'
import {Paragraph} from '../common/F8Text'
import Image from 'react-native-responsive-image'
const DESELECTED_OPACITY = 0.6
import {FilterCardStyles} from '../styles'

class FilterCard extends Component {
    constructor (props) {
      super (props)
      let opacityVal = this.props.selected?0:DESELECTED_OPACITY
      this.state = {
        opacity: new Animated.Value (opacityVal),
        selected: this.props.selected
      }
      this._onPressCard = this._onPressCard.bind (this)
    }
    _onPressCard () {
      let {action, dispatch} = this.props,
          toggleSelect = !this.state.selected
      Animated.timing (
        this.state.opacity,
        {toValue: toggleSelect?0:DESELECTED_OPACITY, duration: 200}
      ).start()
      InteractionManager.runAfterInteractions (()=>{
        dispatch (action)
        this.setState ({selected: toggleSelect})
      })
    }

    componentWillReceiveProps (nextProps) {
      let selectedVal = nextProps.selected,
          opacityVal = selectedVal?0:DESELECTED_OPACITY
      this.setState ({selected: selectedVal, opacity: new Animated.Value (opacityVal)})
    }
    render () {
      let {name, media, touchEnabled} = this.props

      return (
        <View style={{backgroundColor: 'transparent', marginHorizontal: 2}}>
          <Image
            source={{uri: media.replace ('#', '%23')}}
            style={{height: 150, width:150}}>
            <TouchableWithoutFeedback onPress={this._onPressCard}>
              {
                touchEnabled ? (<Animated.View
                                    style={[
                                      FilterCardStyles.cardStyle,
                                      {opacity: this.state.opacity
                                    }]}
                                />)
                              :
                              (<View/>)
              }
            </TouchableWithoutFeedback>
          </Image>
          {name && (<Text style={FilterCardStyles.titleTextStyle}>{`#${name}`}</Text>)}
        </View>
      )
    }
}

export default connect () (FilterCard)
