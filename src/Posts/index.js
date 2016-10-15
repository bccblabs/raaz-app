'use strict'

import React, {
  Component,
  ScrollView,
  View,
  WebView,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {setUserData} from '../reducers/user/userActions'
import {setAccessToken} from '../reducers/history/historyActions'
import {fetchCategoriesFromApi} from '../reducers/stockCar/filterActions'
import {DetailStyles} from '../styles'
import Posts from './Posts'
import F8Header from '../common/F8Header'
import Carmera from '../components/Carmera'

import {userIdSelector, profileSelector} from '../selectors'
const mapStateToProps = (state) => {
  return {
    profileData: profileSelector (state),
    userId: userIdSelector (state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (profileData)=> {
      dispatch (setUserData (profileData))
    },
    saveAccessToken: (access_token)=> {
      dispatch (setAccessToken(access_token))
    }
  }
}


class Raaz extends Component {
  constructor (props) {
    super (props)
    this.state = {}
  }
  componentWillMount () {
    let {profileData, setUserData, saveAccessToken, access_token, user} = this.props
    if (access_token && user) {
      setUserData (user)
      saveAccessToken (access_token)
      this.setState ({...user})
    } else {
      this.setState ({...profileData})
    }
  }

  render () {
    const {picture, name} = this.state
          ,leftItem = {
                      title: "My Posts",
                      onPress: Actions.MyPosts
                    }
          ,rightItem = {
                      title: 'Settings',
                      onPress: Actions.Settings
                    }
    return (
      <View style={{flex: 1}}>
      <F8Header title="Raaz" foreground='dark' leftItem={leftItem} rightItem={rightItem}/>
      <Carmera media={require ('../images/carmera.png')} title={"New Post"} onPress={Actions.NewPost}/>
      <Posts userId={this.props.userId}/>
      </View>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Raaz)
