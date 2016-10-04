'use strict'

import React, {
  Component,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {setUserData} from '../reducers/user/userActions'
import {setAccessToken} from '../reducers/history/historyActions'
import {fetchCategoriesFromApi} from '../reducers/stockCar/filterActions'

import PostListView from './PostListView'
import F8Header from '../common/F8Header'

const mapStateToProps = (state) => {
  return {
    profileData: state.user.profileData,
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
                      title: "New Post",
                      onPress:()=>{Actions.NewPost()}
                    }
          ,rightItem = {
                      title: 'Me',
                      onPress:()=>{Actions.Profile()}
                    }
    return (
      <View style={{flex: 1}}>
      <F8Header title="Posts" foreground='dark' leftItem={leftItem} rightItem={rightItem}/>
      <PostListView/>
      </View>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Raaz)
