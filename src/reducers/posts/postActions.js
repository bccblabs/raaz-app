'use strict'
const {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_ERROR,
  RESET_POSTS_FILTER_STATE,
  SET_POSTS_FILTER_HASH,
  TOGGLE_POST_FILTER_LIST_VALUE,
} = require ('../../constants').default

import {
  CALL_API,
  Schemas
} from '../../middlewares/api'

import {Actions} from 'react-native-router-flux'


export function computePostsFilterHash () {
  return {
    type: SET_POSTS_FILTER_HASH
  }
}

export function fetchPostsFromApi (pageUrl, filterHash, filterTags) {
  if (filterTags) {
    let endpoint = pageUrl?('/post/search' + pageUrl):'/post/search'
    return {
      filterHash,
      [CALL_API]: {
        endpoint,
        types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR],
        schema: Schemas.POSTS_ARRAY,
        filters: filterTags
      }
    }
  } else {
    let endpoint = pageUrl?('/post' + pageUrl):'/post'
    return {
      filterHash,
      [CALL_API]: {
        endpoint,
        types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR],
        schema: Schemas.POSTS_ARRAY,
      }
    }
  }
}

export function fetchPosts (pageUrl) {
  return (dispatch, getState) => {
    dispatch (computePostsFilterHash())
    let filterTags = getState().posts.tags.toJS()
      , filterHash = getState().posts.getIn(['postsFilterHash'])

    if (filterTags.length > 0) {
      dispatch (fetchPostsFromApi (pageUrl, filterHash, filterTags))
    } else {
      dispatch (fetchPostsFromApi (pageUrl, filterHash, undefined))
    }
  }
}

export function togglePostTag (tag) {
  return {
    type: TOGGLE_POST_FILTER_LIST_VALUE,
    payload: tag
  }
}

export function resetPostFilters () {
  return {
    type: RESET_POSTS_FILTER_STATE
  }
}
