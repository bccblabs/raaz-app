'use strict'

const {
  PICK_SUBMODEL,
  PICK_MAKE,
  PICK_MODEL,
  PICK_SPECID,

  ADD_TO_TAGGED_CARS,
  REMOVE_FROM_TAGGED_CARS,

} = require ('../../constants').default

const InitialState = require ('./newpostInitialState').default
const initialState = new InitialState

import {Actions} from 'react-native-router-flux'
var hash = require ('json-hash')
import {List} from 'immutable'
export default function NewPostReducer (state=initialState, action) {
  if (!(state instanceof InitialState)) return state.merge (initialState)

  let nextState
  switch (action.type) {
    case PICK_MAKE: {
      nextState = state
      return nextState.setIn (['pickedMake'], action.payload, val=>action.payload)
    }
    case PICK_MODEL: {
      nextState = state
      return nextState.setIn (['pickedModel'], action.payload, val=>action.payload)
    }
    case PICK_SUBMODEL: {
      nextState = state
      return nextState.setIn (['pickedSubmodel'], action.payload, val=>action.payload)
    }
    case PICK_SPECID: {
      return state.setIn (['pickedSpecId'], action.payload, val=>action.payload)
    }
    case ADD_TO_TAGGED_CARS: {
      let {payload} = action
        , taggedCars = state.get ('taggedCars').set (payload.specId, payload)
      return state.setIn (['taggedCars'], taggedCars, val=> taggedCars)
    }
    case REMOVE_FROM_TAGGED_CARS: {
      let {payload} = action
        , taggedCars = state.get ('taggedCars').delete (payload)
      return state.setIn (['taggedCars'], taggedCars, val=> taggedCars)
    }
    default: {
      return state
    }
  }
}
