'use strict'
import { CALL_API, Schemas } from '../../middlewares/api'
import {createFilterArray} from '../../utils/'
const {
    MAKE_REQUEST,
    MAKE_SUCCESS,
    MAKE_ERROR,

    MODEL_REQUEST,
    MODEL_SUCCESS,
    MODEL_ERROR,

    SUBMODEL_REQUEST,
    SUBMODEL_SUCCESS,
    SUBMODEL_ERROR,

    SPECS_REQUEST,
    SPECS_SUCCESS,
    SPECS_ERROR,

    SPECS_DETAILS_REQUEST,
    SPECS_DETAILS_SUCCESS,
    SPECS_DETAILS_ERROR,

    SET_SELECTED_MAKE,
    SET_SELECTED_MODEL,
    SET_SELECTED_SUBMODEL,
    SET_SELECTED_SPECID,


    TOGGLE_CAR_TAG,
} = require ('../../constants').default


export function setMake (value) {
  return {
    type: SET_SELECTED_MAKE,
    payload: value
  }
}

export function setModel (value) {
  return {
    type: SET_SELECTED_MODEL,
    payload: value
  }
}

export function setSubmodel (value) {
  return {
    type: SET_SELECTED_SUBMODEL,
    payload: value
  }
}

export function setSpecId (value) {
  return {
    type: SET_SELECTED_SPECID,
    payload: value
  }
}

export function fetchMakes() {
  return {
    [CALL_API]: {
      types: [MAKE_REQUEST, MAKE_SUCCESS, MAKE_ERROR],
      endpoint: '/car/makes',
      schema: Schemas.MAKE_ARRAY,
    }
  }
}

export function fetchModels (makeName) {
  return {
    [CALL_API]: {
      types: [MODEL_REQUEST, MODEL_SUCCESS, MODEL_ERROR],
      endpoint: '/car/makes/' + makeName + '/models',
      schema: Schemas.MODEL_ARRAY,
    }
  }
}


export function fetchSubmodels (makeName, modelName) {
  console.log (makeName, modelName, 'fetch')
  return {
    [CALL_API]: {
      types: [SUBMODEL_REQUEST, SUBMODEL_SUCCESS, SUBMODEL_ERROR],
      endpoint: '/car/makes/' + makeName + '/models/' + modelName + '/submodels',
      schema: Schemas.SUBMODEL_ARRAY,
    }
  }
}


export function fetchSpecs (makeName, modelName, submodelName) {
  return {
    [CALL_API]: {
      types: [SPECS_REQUEST, SPECS_SUCCESS, SPECS_ERROR],
      endpoint: '/car/makes/' + makeName + '/models/' + modelName + '/submodels/' + submodelName,
      schema: Schemas.SPEC_ARRAY,
    }
  }
}

export function toggleCarTag (tag) {
  return {
    type: TOGGLE_CAR_TAG,
    payload: tag
  }
}
