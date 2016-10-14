'use strict'
const {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_ERROR,
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