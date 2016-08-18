'use strict'
const {
  GET_PROFILE_SUCCESS,

  SESSION_TOKEN_SUCCESS,
  SET_SESSION_TOKEN,
  SET_STORE,

  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} = require ('../../constants').default

import InitialState from './globalInitialState'
const initialState = new InitialState

export default function globalReducer (state=initialState, action) {
  if (!(state instanceof InitialState)) return state.merge(initialState);

  switch (action.type) {
    case SET_STORE: {
      return state.set('store',action.payload);
    }
    default:
      return state
  }
}
