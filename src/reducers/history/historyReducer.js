'use strict'
// handle saving and loading of listings
const {
  SAVE_PRODUCT,
  LOAD_PRODUCTS,

  SAVE_SPEC,
  LOAD_SPECS,

  SET_ACCESS_TOKEN,
  LOAD_ACCESS_TOKEN,

} = require ('../../constants').default

const InitialState = require ('./historyInitialState').default
const initialState = new InitialState
var _ = require ('lodash')
var Immutable = require('immutable')

export default function historyReducer (state=initialState, action) {
  if (!(state instanceof InitialState)) return state.merge (initialState)
  switch (action.type) {
    case SAVE_PRODUCT: {
      return state.setIn (['productIds'], state.get ('productIds').add(action.payload.id))
    }
    case LOAD_PRODUCTS: {
      if (action.payload !== undefined) {
        return action.payload['history'] &&
                state.setIn (['productIds'], Immutable.Set (action.payload['history']['productIds'])) || state
      } else {
        return state
      }
    }
    case SAVE_SPEC: {
      return state.setIn (['specIds'], state.get('specIds').add (action.payload.specId))
    }
    case LOAD_SPECS: {
      if (action.payload !== undefined) {
        return action.payload['history'] &&
                state.setIn (['specIds'], Immutable.Set (action.payload['history']['specIds'])) || state
      } else {
        return state
      }
    }
    case SET_ACCESS_TOKEN: {
      return state.setIn (['access_token'], action.payload)
    }
    case LOAD_ACCESS_TOKEN: {
      if (action.payload !== undefined) {
        return action.payload['history'] &&
                state.setIn (['access_token'], Immutable.fromJS(action.payload['history']['access_token'])) || state
      } else {
        return state
      }
    }
    default:
    return state
  }
}
