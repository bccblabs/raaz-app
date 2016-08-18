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

    CAT_REQUEST,
    CAT_SUCCESS,
    CAT_ERROR,

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

export function fetchMakes() {
  return {
    [CALL_API]: {
      types: [MAKE_REQUEST, MAKE_SUCCESS, MAKE_ERROR],
      endpoint: '/car/makes',
      schema: Schemas.MAKE_ARRAY,
    }
  }
}

export function fetchModelsFromApi (makeName) {
  return {
    [CALL_API]: {
      types: [MODEL_REQUEST, MODEL_SUCCESS, MODEL_ERROR],
      endpoint: '/car/makes/' + makeName + '/models',
      schema: Schemas.MODEL_ARRAY,
    }
  }
}

export function fetchModels (makeName) {
  return (dispatch, getState) => {
    dispatch (setMake (makeName))
    dispatch (fetchModelsFromApi (makeName))
  }
}

export function fetchSubmodelsFromApi (makeName, modelName) {
  return {
    [CALL_API]: {
      types: [SUBMODEL_REQUEST, SUBMODEL_SUCCESS, SUBMODEL_ERROR],
      endpoint: '/car/makes/' + makeName + '/models/' + modelName + '/submodels',
      schema: Schemas.SUBMODEL_ARRAY,
    }
  }
}

export function fetchSubmodels (modelName) {
  return (dispatch, getState) => {
    let make = getState().stockCar.selectedMake
    dispatch (setModel (modelName))
    dispatch (fetchSubmodelsFromApi (make, modelName))
  }
}

export function fetchSpecsFromApi (makeName, modelName, submodelName) {
  return {
    [CALL_API]: {
      types: [SPECS_REQUEST, SPECS_SUCCESS, SPECS_ERROR],
      endpoint: '/car/makes/' + makeName + '/models/' + modelName + '/submodels/' + submodelName,
      schema: Schemas.SPEC_ARRAY,
    }
  }
}

export function fetchSpecs (submodelName) {
  return (dispatch, getState) => {
    let make = getState().stockCar.selectedMake,
        model = getState().stockCar.selectedModel
    dispatch (setSubmodel (submodelName))
    dispatch (fetchSpecsFromApi (make, model, submodelName))
  }
}

export function toggleCarTag (tag) {
  return {
    type: TOGGLE_CAR_TAG,
    payload: tag
  }
}

export function fetchCategoriesFromApi (category) {
  return {
    key: category,
    [CALL_API]: {
      types: [CAT_REQUEST, CAT_SUCCESS, CAT_ERROR],
      endpoint: '/car/category',
      schema: Schemas.CAT_ARRAY,
    }
  }
}
