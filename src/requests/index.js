'use strict'
import {REQ_TIMEOUT, API_ENDPOINT} from '../constants/'

const GETOPTS = {method: 'GET',headers: {'Accept': 'application/json'}}
    , POSTOPTS = {method: 'POST',headers: {'Accept': 'application/json'}}

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

const RequestUtils = {

  fetchParts (specId, tagName, pageUrl) {
    let url = pageUrl ? (API_ENDPOINT + '/tuning/' + specId + '/' + tagName + pageUrl) : (API_ENDPOINT + '/tuning/' + specId + '/' + tagName)

    return fetchWithTimeout (REQ_TIMEOUT, url, GETOPTS)
            .then ((resp) => {return resp.json()})
            .catch ((error) => {throw error})
  },

  fetchPartDetails (partId, specId) {
    let url = API_ENDPOINT + '/tuning/' + partId + '?specId=' + specId
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
  }
};



module.exports = RequestUtils;
