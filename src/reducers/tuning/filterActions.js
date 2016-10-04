'use strict'
import { CALL_API, Schemas } from '../../middlewares/api'
const {
    TOGGLE_PART_TAG,
    CLEAR_PART_TAG,

    TOGGLE_BUILD_TAG,
    CLEART_BUILD_TAG,

    BUILDS_REQUEST,
    BUILDS_SUCCESS,
    BUILDS_ERROR,

    PARTS_REQUEST,
    PARTS_SUCCESS,
    PARTS_ERROR,

    DEALS_REQUEST,
    DEALS_SUCCESS,
    DEALS_ERROR,

    TAGS_REQUEST,
    TAGS_SUCCESS,
    TAGS_ERROR,

    SPECS_DETAILS_REQUEST,
    SPECS_DETAILS_SUCCESS,
    SPECS_DETAILS_ERROR,

    CAT_REQUEST,
    CAT_SUCCESS,
    CAT_ERROR,

} = require ('../../constants').default


export function fetchBuildsFromApi (pageUrl, tags, specId) {
  return {
    specId,
    [CALL_API]: {
      types: [BUILDS_REQUEST, BUILDS_SUCCESS, BUILDS_ERROR],
      endpoint: pageUrl,
      schema: Schemas.BUILDS_ARRAY,
      filters: tags
    }
  }
}

export function fetchBuilds (paging) {

  if (paging) pageUrl += paging
  return (dispatch, getState) => {
    let tagsJson = getState().posts.tags.toJS()
      , specId = getState().stockCar.selectedSpecId
      , pageUrl = (specId!=='home')?('/build/' + specId):'/build'

    dispatch (fetchBuildsFromApi(pageUrl, tagsJson, specId))
  }
}

export function clearPartTags () {
  return {
    type: CLEAR_PART_TAG
  }
}

export function togglePartTag (tag) {
  return {
    type: TOGGLE_PART_TAG,
    payload: tag
  }
}

export function toggleBuildTag (tag) {
  return {
    type: TOGGLE_BUILD_TAG,
    payload: tag
  }
}

export function clearBuildTag () {
  return {
    type: CLEAR_BUILD_TAG
  }
}


export function fetchDealsFromApi (specId) {
  let endpoint = '/deal', key = specId
  if (specId) endpoint += ('?specId=' + specId)
  else key='home'
  return {
    specId: key,
    [CALL_API]: {
      types: [DEALS_REQUEST, DEALS_SUCCESS, DEALS_ERROR],
      endpoint: endpoint,
      schema: Schemas.DEALS_ARRAY,
    }
  }
}

export function fetchCarDetails (specId) {
  let endpoint = '/car/specs/' + specId
  return {
    specId,
    [CALL_API]: {
      types: [SPECS_DETAILS_REQUEST, SPECS_DETAILS_SUCCESS, SPECS_DETAILS_ERROR],
      endpoint: endpoint,
      schema: Schemas.SPEC_DETAILS_ARRAY,
    }
  }
}


export function fetchCategoriesFromApi (key) {
  let endpoint = (key==='car')?'/car/category':'/tuning/category/?specId=' + key
  return {
    key,
    [CALL_API]: {
      types: [CAT_REQUEST, CAT_SUCCESS, CAT_ERROR],
      endpoint: endpoint,
      schema: Schemas.CAT_ARRAY,
    }
  }
}
