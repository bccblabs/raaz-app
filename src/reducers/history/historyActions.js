'use strict'
import { CALL_API, Schemas } from '../../middlewares/api'

const {

  ADD_TO_SAVED_SPECS,
  REMOVE_SAVED_SPECS,

  TOGGLE_SAVE_PRODUCT,

  SET_ACCESS_TOKEN,

  LOAD_HISTORY

} = require  ('../../constants').default



export function addSpecToHistory (make, model, submodel, specInfo) {
  let {horsepower, specId} = specInfo
  return {
    type: ADD_TO_SAVED_SPECS,
    payload: {make, model, submodel, specId, horsepower}
  }
}


export function removeSpecToHistory (specId) {
  return {
    type: REMOVE_SAVED_SPECS,
    payload: specId
  }
}

export function toggleSaveProduct (part) {
  return {
    type: TOGGLE_SAVE_PRODUCT,
    payload: Object.assign ({}, {...part}, {media: part.media && part.media[0] || ''})
  }
}


export function loadHisory (history) {
  return {
    type: LOAD_HISTORY,
    payload: history
  }
}

// export function syncSpec (specId, userId) {
//   return {
//     [CALL_API]: {
//       types: [SYNC_SPEC_REQ, SYNC_SPEC_SUCCESS, SYNC_SPEC_ERROR],
//       endpoint: '/user/' + userId + '/watchlist/specs',
//       schema: Schemas.SPEC_ARRAY,
//       data: {specId}
//     }
//   }
// }
//
// export function loadSavedSpecs (userId) {
//   return {
//     [CALL_API]: {
//       types: [FETCH_SPEC_REQ, FETCH_SPEC_SUCCESS, FETCH_SPEC_ERROR],
//       endpoint: '/user/' + userId + '/watchlist/specs',
//       schema: Schemas.SPEC_ARRAY,
//     }
//   }
// }
//
// export function removeProduct (userId, productId) {
//   return {
//     [CALL_API]: {
//       types: [DELETE_PRODUCT_REQ, DELETE_PRODUCT_SUCCESS, DELETE_SPEC_ERROR],
//       endpoint: '/user/' + userId + '/watchlist/specs?productId=' + productId,
//       schema: Schemas.SPEC_ARRAY,
//     }
//   }
// }
//
// export function syncProduct (productId, userId) {
//   return {
//     [CALL_API]: {
//       types: [SYNC_PRODUCT_REQ, SYNC_PRODUCT_SUCCESS, SYNC_PRODUCT_ERROR],
//       endpoint: '/user/' + userId + '/watchlist/products',
//       schema: Schemas.SPEC_ARRAY,
//       data: {productId}
//     }
//   }
// }
//
// export function loadSavedProducts (userId) {
//   return {
//     [CALL_API]: {
//       types: [FETCH_PRODUCT_REQ, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_ERROR],
//       endpoint: '/user/' + userId + '/watchlist/products',
//       schema: Schemas.SPEC_ARRAY,
//     }
//   }
// }
//
// export function removeSpecId (specId) {
//   return {
//     type: DELETE_SPEC,
//     payload: specId
//   }
// }

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
