'use strict'
import { CALL_API, Schemas } from '../../middlewares/api'
const {
    TOGGLE_TUNING_TAGS,
    CLEAR_TUNING_TAGS,

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

export function clearTuningTags () {
  return {
    type: CLEAR_TUNING_TAGS
  }
}

export function toggleTuningTags (tag) {
  return {
    type: TOGGLE_TUNING_TAGS,
    payload: tag
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
