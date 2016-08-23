'use strict'
import {REQ_TIMEOUT} from '../constants/'
// since this is not in a component, we dont we timermixin here
// timermixin handles if the component unmounts but timeout not
// cancelled, then callback may throws Exception

// instead, becomes this.setTimeout (fn, timeout_ms) from setTimeout (fn, timeout_ms)
const MOCK_DATA = {
  posts: [
    {
      title: 'E63 W212 Laguna Hills',
      placeholder_url: 'http://edmunds.images.dmotorworks.com/DIRNY048/WU18992_1_small.jpg',
      author_name: 'Bo',
      date: '2016-3-10',
      likes: '1k',
      views: '62k',
    },
    {
      title: 'Hwy1 Night Cruise',
      placeholder_url: 'http://edmunds.images.dmotorworks.com/DIRNY048/WU18992_1_large.jpg',
      author_name: 'Bo',
      date: '2016-3-15',
      likes: '1k',
      views: '25k'
    }
  ]
}
const requestTimeout = (ms) => {
  return new Promise ((resolve, reject) => {
      setTimeout (() => {
        reject (new Error ('req_timeout'))
      }, ms)
  })
};

const API_LISTINGS_TEST = 'http://localhost:9200/car/trim/_search'
const API_URL = 'http://localhost:3001'


const fetchWithTimeout = (time_out, ...args) => {
  return Promise.race ([fetch (...args), requestTimeout (time_out)])
};

const RequestUtils = {

  fetchParts (specId, tagName, pageUrl) {
    let url = pageUrl?(API_URL + '/tuning/' + specId + '/' + tagName + pageUrl):(API_URL + '/tuning/' + specId + '/' + tagName)
    return fetchWithTimeout (REQ_TIMEOUT, url, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
          }
        }).then ((response) => {
          return response.json()
        }).catch ((error) => {
          throw error
        })
  },

  fetchListingCategories (pageNum) {
    return fetchWithTimeout (REQ_TIMEOUT, API_URL + '/listings?pageNum=' + pageNum + '&pageSize=10&subPageNum=0&subPageSize=10', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then ((response) => {
      return response.json()
    })
  },

  fetchPosts (query) {
    console.log (query)
    return MOCK_DATA.posts
  },

  fetchAggs (category) {
    return fetchWithTimeout (5000, API_URL + '/fetchCategorySearches?categoryName=' + category, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then ((response)=> {
      return response.json()
    })
  },

  fetchListings (query, pageNum) {
    return fetchWithTimeout (5000, API_URL + '/searchListings?pageNum=' + pageNum, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then ((response)=>{
        console.log ('request listings', response)
        return response.json()
    })
  }
};



module.exports = RequestUtils;
