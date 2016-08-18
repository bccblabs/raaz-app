'use strict'
import React, {
  Component,
  PropTypes,
  requireNativeComponent
} from 'react-native'

class VRVideo extends Component {
  render () {
    return <RCTVRVideo {...this.props}/>
  }
}

VRVideo.propTypes = {
  enableFullScreen: PropTypes.bool,
  enableCardboardButton: PropTypes.bool,
  imageSourceUri: PropTypes.string,
  enableTouchTracking: PropTypes.bool
}
let RCTVRVideo = requireNativeComponent ('RCTVRVideo', VRVideo)

module.exports = VRVideo
//
// <RNVRPlayer
//   autoplay={false}
//   loop={false}
//   onVideoError={(err)=>{console.error ('video loading error', err)}}
//   onVideoLoad={()=>{console.log ('video loaded!')}}
//   src={this.state.url}
//   vrmode={true}/>
