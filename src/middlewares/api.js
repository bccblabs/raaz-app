import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
const API_ROOT = 'http://192.168.0.102:3001'

// * ponyfilling....
require('es6-symbol/implement')


const listingSchema = new Schema ('listings', {
  idAttribute: 'vin'
})

const makeSchema = new Schema ('makes', {
  idAttribute: 'name'
})
const modelSchema = new Schema ('models', {
  idAttribute: 'name',
})
const submodelSchema = new Schema ('submodels', {
  idAttribute: 'name',
})
const specSchema = new Schema ('specs', {
  idAttribute: 'specId',
})
const specsDetailsSchema = new Schema ('specDetails', {
  idAttribute: 'specId',
})

const stockCarSchema = new Schema ('stockCar', {
  idAttribute: 'key'
})

const buildSchema = new Schema ('builds', {
  idAttribute: 'key'
})

const partSchema = new Schema ('tuningItems', {
  idAttribute: 'key'
})

const postSchema = new Schema ('posts', {
  idAttribute: 'postId'
})

const tagSchema = new Schema ('tags', {
  idAttribute: 'name'
})

const categorySchema = new Schema ('categories', {
  idAttribute: 'name'
})

const dealSchema = new Schema ('deals', {
  idAttribute: 'dealId'
})

categorySchema.define ({
  categories: arrayOf (categorySchema)
})

postSchema.define ({
  posts: arrayOf (postSchema)
})

tagSchema.define ({
  tags: arrayOf (tagSchema)
})

dealSchema.define ({
  deals: arrayOf (dealSchema)
})

specsDetailsSchema.define ({
  specsDetails: arrayOf (specsDetailsSchema)
})

export const Schemas = {
  MAKE_ARRAY: arrayOf (makeSchema),
  MODEL_ARRAY: arrayOf (modelSchema),
  SUBMODEL_ARRAY: arrayOf (submodelSchema),
  SPEC_ARRAY: arrayOf (specSchema),
  SPEC_DETAILS_ARRAY: arrayOf (specsDetailsSchema),
  STOCKCAR_ARRAY: arrayOf (stockCarSchema),
  BUILDS_ARRAY: arrayOf (buildSchema),
  PARTS_ARRAY: arrayOf (partSchema),
  POSTS_ARRAY: arrayOf (postSchema),

  TAGS_ARRAY: arrayOf (tagSchema),
  DEALS_ARRAY: arrayOf (dealSchema),

  CAT_ARRAY: arrayOf (categorySchema)
}

function getNextPageUrl (response) {
  return response.nextPageUrl
}

function callApi (endpoint, schema, data,) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint,
        body = JSON.stringify ({data: data}),
        postOpts = {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                  },
                  body
        },
        getOpts = { method: 'GET', headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        }},
        opts = data===undefined?getOpts:postOpts

  let fetchPromise = fetch (fullUrl, opts)

  return fetchPromise.then(response => {
    if (!response.ok)
      return Promise.reject (response)
    else
      return response.json()
  }).then ((responseJson) => {
    return Object.assign ({}, normalize (responseJson.data, schema), {nextPageUrl: responseJson.nextPageUrl})
  })
}

export const CALL_API = Symbol ('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined')
    return next (action)

  let { endpoint } = callAPI
  const { schema, types, data } = callAPI

  if (typeof endpoint === 'function')
    endpoint = endpoint (store.getState())
    if (typeof endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.')
    }
    if (!schema) {
      throw new Error('Specify one of the exported Schemas.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.')
    }

    function actionWith(data) {
      const finalAction = Object.assign({}, action, data)
      delete finalAction[CALL_API]
      return finalAction
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType }))

    return callApi(endpoint, schema, data).then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }))
    )
}
