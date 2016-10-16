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

import {DetailStyles} from '../styles'
import Posts from './Posts'
import F8Header from '../common/F8Header'
import Carmera from '../components/Carmera'

export default class PostHome extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    const leftItem = {
                      title: "My Posts",
                      onPress: Actions.MyPosts
                    }
        , rightItem = {
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

