'use strict'

import stockCar from './stockCar/filterReducer'
import tuning from './tuning/filterReducer'
import global from './global/globalReducer'
import paginate from './paginate/paginateReducer'
import history from './history/historyReducer'
import posts from './posts/postsReducer'
import user from './user/userReducer'
import newpost from './newpost/newpostReducer'

import assign from 'lodash/assign'

import {combineReducers} from 'redux'
const {
  BUILDS_REQUEST,
  BUILDS_SUCCESS,
  BUILDS_ERROR,

  PARTS_REQUEST,
  PARTS_SUCCESS,
  PARTS_ERROR,

  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_ERROR,

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

  DEALS_REQUEST,
  DEALS_SUCCESS,
  DEALS_ERROR,

  CAT_REQUEST,
  CAT_SUCCESS,
  CAT_ERROR,

} = require ('../constants').default

let initState = {
  stockCar: {},
  makes: {},
  models: {},
  submodels: {},
  specs: {},
  builds: {},
  parts: {},
  posts: {},
  specsDetails: {},
  newpost: {},
}

function entities(state=initState, action) {
  if (action.response && action.response.entities) {
    return assign({}, state,  action.response.entities)
  }
  return state
}


const pagination = combineReducers ({

  buildsPagination: paginate ({
    mapActionToKey: action =>action.specId,
    types: [
      BUILDS_REQUEST,
      BUILDS_SUCCESS,
      BUILDS_ERROR
    ]
  }),

  dealsPagination: paginate ({
    mapActionToKey: action=>action.specId,
    types: [
      DEALS_REQUEST,
      DEALS_SUCCESS,
      DEALS_ERROR,
    ]
  }),

  partsPagination: paginate ({
    mapActionToKey: action =>action.specId,
    types: [
      PARTS_REQUEST,
      PARTS_SUCCESS,
      PARTS_ERROR
    ]
  }),

  postsPagination: paginate ({
    mapActionToKey: action =>action.filterHash,
    types: [
      POSTS_REQUEST,
      POSTS_SUCCESS,
      POSTS_ERROR,
    ]
  }),

  categoriesPagination: paginate ({
    mapActionToKey: action=>action.key,
    types: [
      CAT_REQUEST,
      CAT_SUCCESS,
      CAT_ERROR,
    ]
  }),

  specDetailsPagination: paginate ({
    mapActionToKey: action=>action.specId,
    types: [
      SPECS_DETAILS_REQUEST,
      SPECS_DETAILS_SUCCESS,
      SPECS_DETAILS_ERROR,
    ]
  })
})


const rootReducer = combineReducers ({
  entities,
  global,
  pagination,
  history,
  user,
  stockCar,
  tuning,
  posts,
  newpost,
})



export default rootReducer
