'use strict'
const {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_ERROR,

  POSTS_REQUEST_USER,
  POSTS_SUCCESS_USER,
  POSTS_ERROR_USER,

  POSTS_REQUEST_BUILD,
  POSTS_SUCCESS_BUILD,
  POSTS_ERROR_BUILD,

} = require ('../../constants').default

import {
  CALL_API,
  Schemas
} from '../../middlewares/api'

export function fetchPosts (nextPageUrl, userId) {
  let endpoint = nextPageUrl? '/post' + nextPageUrl : '/post'
  endpoint = userId?( endpoint + '&' + 'userId=' + userId):endpoint
  return {
    key: 'home',
    [CALL_API]: {
      endpoint,
      types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR],
      schema: Schemas.POSTS_ARRAY,
    }
  }
}

export function fetchPostsByUserId (nextPageUrl, userId) {
  let endpoint = '/post/user/' + userId
  if (nextPageUrl) endpoint += nextPageUrl
  return {
    userId,
    [CALL_API]: {
      endpoint,
      types: [POSTS_REQUEST_USER, POSTS_SUCCESS_USER, POSTS_ERROR_USER],
      schema: Schemas.POSTS_ARRAY,
    }
  }
}

export function fetchPostsByBuildId (nextPageUrl, buildId) {
  let endpoint = '/post/build/' + buildId
  if (nextPageUrl) endpoint += nextPageUrl
  return {
    buildId,
    [CALL_API]: {
      endpoint,
      types: [POSTS_REQUEST_BUILD, POSTS_SUCCESS_BUILD, POSTS_ERROR_BUILD],
      schema: Schemas.POSTS_ARRAY,
    }
  }
}