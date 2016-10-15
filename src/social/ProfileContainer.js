'use strict'

import React, {
  Component,
  Image,
  Text,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Carmera from '../components/Carmera'

import F8Header from '../common/F8Header'
import {DetailStyles, PostStyles, General} from '../styles'

export default class ProfileContainer extends Component {
  render () {
    let {profileData, listContent, btnContent} = this.props
      , {picture, name, email, phone, facebook, instagram} = profileData
      , leftItem = {title: "Back", onPress: Actions.pop}
      , rightItem = {title: 'Settings', onPress: Actions.Settings}
      , header = (
        <F8Header
          foreground="dark"
          leftItem={leftItem}
          rightItem={rightItem}
          style={General.headerStyle}/>
      )
      , foregroundContent = (
        <View style={DetailStyles.userInfoContainer}>
          <Image style={PostStyles.largeUserPhoto} source={{uri: picture}}/>
          <Text style={DetailStyles.lightTitle}>{name}</Text>            
        </View>
      )

    return (
      <View style={{flex: 1}}>
      <ParallaxScrollView
        backgroundColor="transparent"
        contentBackgroundColor="white"
        backgroundSpeed={1}
        parallaxHeaderHeight={300}
        renderFixedHeader={() => header}
        stickyHeaderHeight={64}
        renderForeground={()=>{return foregroundContent}}
        renderBackground={() => <Image source={require ('../images/2jz.png')} style={DetailStyles.VRImageHolder}/>}
        >
        <View style={{margin:16, marginTop: 0, alignItems: 'center'}}>
        {listContent}
        </View>
      </ParallaxScrollView>
      {btnContent}
      </View>
    )
  }
}

