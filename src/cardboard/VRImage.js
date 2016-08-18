'use strict'
import React, {
  Component,
  PropTypes,
  requireNativeComponent,
} from 'react-native'

class VRImage extends Component {
  render () {
    return <RCTVRImage {...this.props}/>
  }
}

VRImage.propTypes = {
  enableFullScreen: PropTypes.bool,
  enableCardboardButton: PropTypes.bool,
  imageSourceUri: PropTypes.string,
  enableTouchTracking: PropTypes.bool
}

let RCTVRImage = requireNativeComponent ('RCTVRImage', VRImage)

module.exports = VRImage
