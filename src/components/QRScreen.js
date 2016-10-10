'use strict'

import React, {Component, Text,  View} from 'react-native'
import {Actions} from 'react-native-router-flux'

import QRCodeScanner from 'react-native-qrcode-scanner';
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import {Heading3} from '../common/F8Text'

import {Titles} from '../styles'
export default class QRScreen extends Component {

  render () {
    return (
      <View>
      <F8Header title="QR Scan" foreground="dark" leftItem={{title: 'Back', onPress: Actions.pop}}/>
      <QRCodeScanner
        onRead={(qrCode)=>{Actions.BuildDetails ({buildId: qrCode})}}
        topContent={(<View style={{paddingBottom: 8}}><Heading3 style={Titles.buildTitle}>{"Scan cars with RAAZ QR to discover more!"}</Heading3></View>)}
        />
      </View>
    )
  }
}
