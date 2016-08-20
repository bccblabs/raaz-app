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

export function fetchPartsFromApi (specId, pageUrl, tagsJson) {
  return {
    specId,
    [CALL_API]: {
      types: [PARTS_REQUEST, PARTS_SUCCESS, PARTS_ERROR],
      endpoint: pageUrl,
      schema: Schemas.PARTS_ARRAY,
      filters: tagsJson
    }
  }
}

export function fetchBuildsFromApi (specId, pageUrl, tagsJson) {
  return {
    filterHash,
    [CALL_API]: {
      types: [BUILDS_REQUEST, BUILDS_SUCCESS, BUILDS_ERROR],
      endpoint: pageUrl,
      schema: Schemas.BUILDS_ARRAY,
      filters: filterJson
    }
  }
}

export function fetchBuilds (specId, paging) {
  const pageUrl = '/tuning/' + specId + '/builds?' + paging + sortBy

  return (dispatch, getState) => {
    let tagsJson = getState().tuning.filterTags.toJS()
    dispatch (fetchBuildsFromApi(specId, pageUrl, tagsJson))
  }
}


export function fetchParts (specId, paging, sortBy) {
  const pageUrl = '/tuning/' + specId + '/parts?' + paging + sortBy

  return (dispatch, getState) => {
    let tagsJson = getState().tuning.filterTags.toJS()
    dispatch (fetchPartsFromApi (specId, pageUrl, tagsJson))
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
