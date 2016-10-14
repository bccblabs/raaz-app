'use strict'

import React, {
  Component,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import {Heading3, Paragraph} from '../common/F8Text'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'

import ListContainer from '../common/ListContainer'
import PostsByUserId from '../Posts/PostsByUserId'

import {FilterStyles} from '../styles'


const mapStateToProps = (state) => {
  return {
    profileData: state.user.profileData,
    loginType: state.user.loginType,
    access_token: state.history.access_token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}


class Profile extends Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  componentWillMount () {
    let {profileData, loginType, access_token} = this.props
    this.setState ({profileData, loginType, access_token})
  }


  render () {

    const {picture, name, email, phone, facebook, instagram, } = this.state.profileData
          ,leftItem = {title: "Back", onPress:Actions.pop}
          ,rightItem = {title: 'Settings', onPress: Actions.Settings}
          ,profilePicture = picture && <Image source={{uri: picture}} style={{borderWidth: 0.5, borderColor: 'white', width: 100, height: 100, borderRadius: 16, alignSelf: 'center'}}/>
          ,parallaxContent= (
            <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', width: window.width}}>
              <View style={{backgroundColor: 'transparent'}}>
              {profilePicture}
              <Heading3 style={{alignSelf: 'center', paddingTop: 16, color: 'white'}}>{name}</Heading3>
              </View>
            </View>
          )
    return (
      <ListContainer
        refs={this.storeInnerRef}
        backgroundImage={require ('../images/2jz.png')}
        parallaxContent={parallaxContent}
        leftItem={leftItem}
        rightItem={rightItem}>
        <PostsByUserId title="Posts"/>
      </ListContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
