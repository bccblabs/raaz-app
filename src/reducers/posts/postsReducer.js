'use strict'

const {
  RESET_POSTS_FILTER_STATE,
  SET_POSTS_FILTER_HASH,
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
      return state.tags.clear()
    }
    case SET_POSTS_FILTER_HASH: {
      let filterHash = hash.digest (state.getIn(['tags']).toJSON())
      return state.setIn (['postsFilterHash'], filterHash, (val)=>filterHash)
    }
    default: {
      return state
    }
  }
}
