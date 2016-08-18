'use strict'
import {
  LOAD,
  SYNC,
} from 'redux-storage'

import { CALL_API, Schemas } from '../../middlewares/api'

const {

  LOAD_ACCESS_TOKEN,
  SET_ACCESS_TOKEN,

  SYNC_PRODUCT_REQ,
  SYNC_PRODUCT_SUCCESS,
  SYNC_PRODUCT_ERROR,

  FETCH_PRODUCT_REQ,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,

  DELETE_PRODUCT_REQ,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,

  SYNC_SPEC_REQ,
  SYNC_SPEC_SUCCESS,
  SYNC_SPEC_ERROR,

  FETCH_SPEC_REQ,
  FETCH_SPEC_SUCCESS,
  FETCH_SPEC_ERROR,

  DELETE_SPEC_REQ,
  DELETE_SPEC_SUCCESS,
  DELETE_SPEC_ERROR,

} = require  ('../../constants').default

export function syncSpec (specId, userId) {
  return {
    [CALL_API]: {
      types: [SYNC_SPEC_REQ, SYNC_SPEC_SUCCESS, SYNC_SPEC_ERROR],
      endpoint: '/user/' + userId + '/watchlist/specs',
      schema: Schemas.SPEC_ARRAY,
      data: {specId}
    }
  }
}

export function loadSavedSpecs (userId) {
  return {
    [CALL_API]: {
      types: [FETCH_SPEC_REQ, FETCH_SPEC_SUCCESS, FETCH_SPEC_ERROR],
      endpoint: '/user/' + userId + '/watchlist/specs',
      schema: Schemas.SPEC_ARRAY,
    }
  }
}

export function removeProduct (userId, productId) {
  return {
    [CALL_API]: {
      types: [DELETE_PRODUCT_REQ, DELETE_PRODUCT_SUCCESS, DELETE_SPEC_ERROR],
      endpoint: '/user/' + userId + '/watchlist/specs?productId=' + productId,
      schema: Schemas.SPEC_ARRAY,
    }
  }
}

export function syncProduct (productId, userId) {
  return {
    [CALL_API]: {
      types: [SYNC_PRODUCT_REQ, SYNC_PRODUCT_SUCCESS, SYNC_PRODUCT_ERROR],
      endpoint: '/user/' + userId + '/watchlist/products',
      schema: Schemas.SPEC_ARRAY,
      data: {productId}
    }
  }
}

export function loadSavedProducts (userId) {
  return {
    [CALL_API]: {
      types: [FETCH_PRODUCT_REQ, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_ERROR],
      endpoint: '/user/' + userId + '/watchlist/products',
      schema: Schemas.SPEC_ARRAY,
    }
  }
}

export function removeSpecId (specId) {
  return {
    type: DELETE_SPEC,
    payload: specId
  }
}

export function setAccessToken (access_token) {
  return {
    type: SET_ACCESS_TOKEN,
    payload: access_token
  }
}

export function loadAccessToken (history) {
  return {
    type: LOAD_ACCESS_TOKEN,
    payload: history
  }
}
