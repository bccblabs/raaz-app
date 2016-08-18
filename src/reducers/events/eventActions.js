'use strict'
import React, {
  Component,
  Platform,
  Navigator,
} from 'react-native'

const {
  EVENTS_REQUEST,
  EVENTS_SUCCESS,
  EVENTS_ERROR,

  RESET_EVENTS_FILTER_STATE,
  SET_EVENTS_FILTER_HASH,
  SET_EVENTS_FILTER_STATE,
  TOGGLE_EVENTS_FILTER_LIST_VALUE,
} = require ('../../constants').default

import {
  CALL_API,
  Schemas
} from '../../middlewares/api'

import {Actions} from 'react-native-router-flux'


export function computeEventsFilterHash () {
  return {
    type: SET_EVENTS_FILTER_HASH
  }
}

export function fetchEventsFromApi (pageUrl, filterHash, filterJson) {
  return {
    filterHash,
    [CALL_API]: {
      types: [EVENTS_REQUEST, EVENTS_SUCCESS, EVENTS_ERROR],
      endpoint: pageUrl,
      schema: Schemas.EVENTS_ARRAY,
      filters: filterJson
    }
  }
}

export function fetchEvents (pageUrl) {
  return (dispatch, getState) => {
    dispatch (computeEventsFilterHash())
    let filterJson = getState().events.postsFilter.toJS(),
        filterHash = getState().events.getIn(['eventsFilterHash'])
    dispatch (fetchEventsFromApi (pageUrl, filterHash, filterJson))
  }
}

export function toggleEventTag (tag) {
  return {
    type: TOGGLE_EVENTS_FILTER_LIST_VALUE,
    payload: tag
  }
}

export function resetPostFilters () {
  return {
    type: RESET_EVENTS_FILTER_STATE
  }
}
