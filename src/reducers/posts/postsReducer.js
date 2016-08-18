'use strict'

const {
  RESET_POSTS_FILTER_STATE,
  SET_POSTS_FILTER_HASH,
  TOGGLE_POST_FILTER_LIST_VALUE,
  SAVE_POST_DRAFT,
  LIKE_USER_POST,
  VIEW_USER_POST,
} = require ('../../constants').default

const InitialState = require ('./postInitialState').default,
      initialState = new InitialState

var _ = require ('lodash')
  , hash = require ('json-hash')
  , Immutable = require('immutable')

export default function postsReducer (state=initialState, action) {
  if (!(state instanceof InitialState)) return state.merge (initialState)
  switch (action.type) {
    case RESET_POSTS_FILTER_STATE: {
      return state.postsFilter.clear()
    }
    case SET_POSTS_FILTER_HASH: {
      let filterHash = hash.digest (state.getIn(['postsFilter']).toJSON())
      return state.setIn (['postsFilterHash'], filterHash, (val)=>filterHash)
    }
    case TOGGLE_POST_FILTER_LIST_VALUE: {
      let value = action.payload,
          filter_list = state.getIn (['postsFilter']),
          new_filter_list
      if (filter_list.indexOf (value) > -1) {
        new_filter_list = filter_list.delete (filter_list.indexOf (value))
      } else {
        new_filter_list = filter_list.push (value)
      }
      return state.setIn (['postsFilter'], new_filter_list, (val)=>new_filter_list)
    }
    default: {
      return state
    }
  }
}
