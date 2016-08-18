'use strict'
const {
  SET_CURRENT_LOCATION,
  SET_SESSION_TOKEN,
  SET_STORE
} = require ('../../constants').default

export function setSessionToken(sessionToken) {
  return {
    type: SET_SESSION_TOKEN,
    payload: sessionToken
  };
}


export function setStore (store, history) {
  return {
    type: SET_STORE,
    payload: {store, history}
  }
}

export function setCurrentLocation (location) {
  return {
    type: SET_CURRENT_LOCATION,
    payload: location
  }
}
