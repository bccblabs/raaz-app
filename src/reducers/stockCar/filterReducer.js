'use strict'

const {
  SET_SELECTED_SUBMODEL,
  SET_SELECTED_MAKE,
  SET_SELECTED_MODEL,
  SET_SELECTED_SPECID,
  TOGGLE_CAR_TAG,
} = require ('../../constants').default

const InitialState = require ('./filterInitialState').default
const initialState = new InitialState

import {Actions} from 'react-native-router-flux'
var hash = require ('json-hash')
import {List} from 'immutable'
export default function stockCarReducer (state=initialState, action) {
  if (!(state instanceof InitialState)) return state.merge (initialState)

  let nextState
  switch (action.type) {
    case SET_SELECTED_MAKE: {
      nextState = state
      return nextState.setIn (['selectedMake'], action.payload, val=>action.payload)
    }
    case SET_SELECTED_MODEL: {
      nextState = state
      return nextState.setIn (['selectedModel'], action.payload, val=>action.payload)
    }
    case SET_SELECTED_SUBMODEL: {
      nextState = state
      return nextState.setIn (['selectedSubmodel'], action.payload, val=>action.payload)
    }
    case SET_SELECTED_SPECID: {
      return state.setIn (['selectedSpecId'], action.payload, val=>action.payload)
    }
    case TOGGLE_CAR_TAG: {
      let value = action.payload,
          filter_list = state.getIn (['tags']),
          new_filter_list

      if (filter_list.indexOf (value) > -1) {
        new_filter_list = filter_list.delete (filter_list.indexOf (value))
      } else {
        new_filter_list = filter_list.push (value)
      }
      nextState = state.setIn (['tags'], new_filter_list, val=>new_filter_list)
      return nextState
    }
    default: {
      return state
    }
  }
}
