'use strict'
// handle saving and loading of listings
const {

  ADD_TO_SAVED_SPECS,
  REMOVE_SAVED_SPECS,

  ADD_TO_SAVED_PRODUCT,
  REMOVE_SAVED_PRODUCT,

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

    case ADD_TO_SAVED_SPECS: {
      let {payload} = action
        , specs = state.get ('specs').set (payload.specId, payload)
      return state.setIn (['specs'], specs, val=> specs)
    }

    case REMOVE_SAVED_SPECS: {
      let {payload} = action
        , specs = state.get ('specs').delete (payload)
      return state.setIn (['specs'], specs, val=> specs)
    }

    case ADD_TO_SAVED_PRODUCT: {
      let {payload} = action
        , parts = state.get ('parts').set (payload.partId, payload)
      return state.setIn (['parts'], parts, val=> parts)
    }

    case REMOVE_SAVED_PRODUCT: {
      let {payload} = action
        , parts = state.get ('parts').delete (payload)
      return state.setIn (['parts'], parts, val=> parts)
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
