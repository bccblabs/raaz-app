'use strict'
import {Linking} from 'react-native'
var qs = require ('qs')
const FacebookSDK = require('FacebookSDK')
import {Actions} from 'react-native-router-flux'
import {
  AUTH0_FB_SIGNIN,
  AUTH0_INSTAGRAM_SIGNIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL,
  API_ENDPOINT,
} from '../../constants'

const {
  LOGIN,
  LOGGED_IN,
  UPDATE_EMAIL,
  UPDATE_PHONE,
  UPDATE_ADDRESS,
  UPDATE_CITY,
  UPDATE_STATE,
  UPDATE_COUNTRY,
  UPDATE_ZIP,
} = require ('../../constants').default

async function handleLinking (event) {
  let {url} = event,
      params = url.replace (AUTH0_CALLBACK_URL,'').split ('#')[1],
      {access_token} = qs.parse (params),
      profileData = await fetchUserProfileApi (access_token)
  Actions.tabBar({user: profileData, access_token})
}

export function setUserData (profileData) {
  return {
    type: 'LOGGED_IN',
    payload: profileData
  }
}

function fetchUserProfileApi (access_token) {
    let url = API_ENDPOINT + '/socialSignIn?access_token=' + access_token

    return fetch ( url, {
      method: 'GET',
    })
    .then ((resp)=>{
      console.log (resp)
      return resp.json()
    })
    .then ((respJson)=>{

      console.log ('fetchUserProfileApi: api json', respJson)
      return respJson
    })
    .catch ((err) => {return err})

}

Linking.addEventListener ('url', handleLinking)

async function _loginAuth0 (endpoint) {
  Linking.openURL (endpoint)
}

function loginWithFacebook() {
  _loginAuth0(AUTH0_FB_SIGNIN)
  return {
    type: LOGIN,
    payload: { loginType: 'facebook'}
  }
}

function loginWithInstagram() {
  _loginAuth0(AUTH0_INSTAGRAM_SIGNIN)
  return {
    type: LOGIN,
    payload: { loginType: 'instagram'}
  }
}

function logOut() {
  return (dispatch) => {
    return dispatch({
      type: 'LOGGED_OUT',
    })
  }
}


module.exports = {loginWithFacebook, loginWithInstagram, logOut, setUserData};
