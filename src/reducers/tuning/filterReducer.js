'use strict'

const {
  TOGGLE_TUNING_TAGS,
  CLEAR_TUNING_TAGS,
} = require ('../../constants').default

const {Map, List} = require ('immutable')
    , InitialState = require ('./filterInitialState').default
    , initialState = new InitialState

var _ = require('lodash'),
    hash = require ('json-hash')

export default function tuningReducer (state=initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge (state)
  let nextState
  switch (action.type) {

    case TOGGLE_TUNING_TAGS: {
      let value = action.payload,
          filter_list = state.getIn (['filterTags']),
          new_filter_list

      if (filter_list.indexOf (value) > -1) {
        new_filter_list = filter_list.delete (filter_list.indexOf (value))
      } else {
        new_filter_list = filter_list.push (value)
      }
      nextState = state.setIn (['filterTags'], new_filter_list, val=>new_filter_list)
      return nextState
    }

    case CLEAR_TUNING_TAGS: {
      return initialState
    }
    default: {
      return state
    }
  }
}
