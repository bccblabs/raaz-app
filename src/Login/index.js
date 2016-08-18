'use strict'

import React, {
  Component,
} from 'react-native'

import LoginScreen from './LoginScreen'
import {connect} from 'react-redux'
import * as userActions from '../reducers/user/userActions'
var Actions = require ('react-native-router-flux').Actions

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithFacebook:()=> {
      dispatch (userActions.loginWithFacebook())
    },
    loginWithInstagram: ()=> {
      dispatch (userActions.loginWithInstagram())
    }
  }
}

class LoginContainer extends Component {
  render () {
    return (
      <LoginScreen {...this.props}/>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (LoginContainer)
