'use strict'

const {
  TOGGLE_PART_TAG,
  CLEAR_PART_TAG,
SET_TUNING_TAGS,
  TOGGLE_BUILD_TAG,
  CLEAR_BUILD_TAG,
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

    case TOGGLE_PART_TAG: {
      let value = action.payload,
          filter_list = state.getIn (['partTags']),
          new_filter_list

      if (filter_list.indexOf (value) > -1) {
        new_filter_list = filter_list.delete (filter_list.indexOf (value))
      } else {
        new_filter_list = filter_list.push (value)
      }
      nextState = state.setIn (['partTags'], new_filter_list, val=>new_filter_list)
      return nextState
    }

    case TOGGLE_BUILD_TAG: {
      let value = action.payload,
          filter_list = state.getIn (['buildTags']),
          new_filter_list
      if (filter_list.indexOf (value) > -1) {
        new_filter_list = filter_list.delete (filter_list.indexOf (value))
      } else {
        new_filter_list = filter_list.push (value)
      }
      return state.setIn (['buildTags'], new_filter_list, (val)=>new_filter_list)
    }

    case CLEAR_PART_TAG: {
      return initialState
    }

    case CLEAR_BUILD_TAG: {
      return initialState
    }

    default: {
      return state
    }
  }
}
