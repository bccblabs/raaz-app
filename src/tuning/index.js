'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import BuildsList from '../tuning/BuildsList'
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import Carmera from '../components/Carmera'
export default class Tuning extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const leftItem = {title: 'Orders', onPress: Actions.Orders}
        , rightItem = {title: 'Saved', onPress:Actions.WatchList}

    return (
      <View style={{flex: 1, backgroundColor:'transparent'}}>
      <F8Header title="Tuning" foreground='dark' leftItem={leftItem} rightItem={rightItem}/>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: -1}}>
      <F8Button style={{flex: 1}}
                onPress={Actions.QRScan}
                type="search"
                icon={require ('../common/img/qr.png')}
                caption={"By QR Code"}/>
      <F8Button style={{flex: 1}}  onPress={Actions.Makes}
                caption="search by car" type="search"
                icon={require ('../common/img/search.png')}/>
      </View>
      <BuildsList/>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    opacity: 0.6,
    justifyContent: 'center',
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderColor: 'black'
  },
  text: {
    fontSize: 10,
    color: 'black',
    fontWeight: '700',
    letterSpacing: 1,
    alignSelf: 'center',
    textDecorationLine: 'underline'
  },
  clear: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  header: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: 'black',
    opacity: 0.6,
  },
})
