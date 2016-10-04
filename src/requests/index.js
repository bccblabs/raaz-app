'use strict'
import {REQ_TIMEOUT, API_ENDPOINT} from '../constants/'

const GETOPTS = {method: 'GET',headers: {'Accept': 'application/json'}}
const requestTimeout = (ms) => {
  return new Promise ((resolve, reject) => {
      setTimeout (() => {
        reject (new Error ('req_timeout'))
      }, ms)
  })
};

const fetchWithTimeout = (time_out, ...args) => {
  return Promise.race ([fetch (...args), requestTimeout (time_out)])
};


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    return null
  }
}

const RequestUtils = {

  fetchParts (specId, tagName, pageUrl) {
    let url = pageUrl ? (API_ENDPOINT + '/tuning/spec/' + specId + '/' + tagName + pageUrl) : (API_ENDPOINT + '/tuning/spec/' + specId + '/' + tagName)

    return fetchWithTimeout (REQ_TIMEOUT, url, GETOPTS)
            .then ((resp) => {return resp.json()})
            .catch ((error) => {throw error})
  },

  fetchPartDetails (partId, specId) {
    let url = API_ENDPOINT + '/tuning/parts/' + partId + '?specId=' + specId
    return fetchWithTimeout (REQ_TIMEOUT, url, GETOPTS)
            .then ((resp)=> {return resp.json()})
            .catch ((err)=> {throw err})
  },

  fetchBuildDetails (buildId) {
    let url = API_ENDPOINT + '/build/details/' + buildId
    return fetchWithTimeout (REQ_TIMEOUT, url, GETOPTS)
          .then ((resp) => {
            return resp.json()
          })
          .catch ((err) => {throw err})
  },

  fetchSavedBuilds (userId, partTags, pageUrl) {
    let url = pageUrl ? (API_ENDPOINT + '/user/' + userId + '/savedBuilds' + pageUrl) : (API_ENDPOINT + '/user/' + userId + '/savedBuilds')
      , postOpts = {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                  },
                  partTags
        }

    return fetchWithTimeout (REQ_TIMEOUT, url, postOpts)
          .then (checkStatus)
          .then ((data) => {
            console.log('parsed json', data)
            return data
          })
          .catch ((err) => {
            console.error (err)
            return null
          })
  },

  fetchSavedParts (userId, partTags, pageUrl) {
      let url = pageUrl ? (API_ENDPOINT + '/user/' + userId + '/savedParts' + pageUrl) : (API_ENDPOINT + '/user/' + userId + '/savedParts')
        , postOpts = {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type':'application/json'
                    },
                    partTags
          }
      return fetchWithTimeout (REQ_TIMEOUT, url, postOpts)
            .then (checkStatus)
            .then ((data) => {
              console.log('parsed json', data)
              return data
            })
            .catch ((err) => {
              console.error (err)
              return null
            })
  }


};



module.exports = RequestUtils;
