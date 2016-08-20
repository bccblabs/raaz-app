import keyMirror from 'key-mirror'

const REQ_TIMEOUT = 5000;
exports.REQ_TIMEOUT = REQ_TIMEOUT;

exports.AUTH0_FB_SIGNIN = module.exports.AUTH0_FB_SIGNIN = 'https://raaz.auth0.com/authorize?response_type=token&client_id=38IZWX4rxcewydOFTD3fDuGRh7nyzDqi&redirect_uri=raaz://callback&connection=facebook'
exports.AUTH0_INSTAGRAM_SIGNIN = module.exports.AUTH0_INSTAGRAM_SIGNIN = 'https://raaz.auth0.com/authorize?response_type=token&client_id=38IZWX4rxcewydOFTD3fDuGRh7nyzDqi&redirect_uri=raaz://callback&connection=instagram'

exports.AUTH0_CLIENT_ID = module.exports.AUTH0_CLIENT_ID ='38IZWX4rxcewydOFTD3fDuGRh7nyzDqi'
exports.AUTH0_CLIENT_SECRET = module.exports.AUTH0_CLIENT_SECRET ='RyE7bMsLckFWNCGSEaX0DkRsTHEryHX_d7yGwzQUXs8mwvvKa2qxIO3S0QNR54Og'
exports.AUTH0_DOMAIN = module.exports.AUTH0_DOMAIN ='https://raaz.auth0.com'

exports.AUTH0_CALLBACK_URL = '//raaz://callback'

exports.API_ENDPOINT = module.exports.API_ENDPOINT = "http://localhost:3001"

export default keyMirror ({

  /* Global */
  NOOP: null,
  SET_CURRENT_LOCATION: null,
  SESSION_TOKEN_SUCCESS: null,
  SET_SESSION_TOKEN: null,
  SET_STORE: null,


  /* Posts */
  POSTS_REQUEST: null,
  POSTS_SUCCESS: null,
  POSTS_ERROR: null,

  RESET_POSTS_FILTER_STATE: null,
  SET_POSTS_FILTER_HASH: null,
  SET_POSTS_FILTER_STATE: null,
  TOGGLE_POST_FILTER_LIST_VALUE: null,

  SAVE_POST_DRAFT: null,
  LIKE_USER_POST: null,
  VIEW_USER_POST: null,


  /* Events */
  EVENTS_REQUEST: null,
  EVENTS_SUCCESS: null,
  EVENTS_ERROR: null,

  RESET_EVENTS_FILTER_STATE: null,
  SET_EVENTS_FILTER_HASH: null,
  SET_EVENTS_FILTER_STATE: null,
  TOGGLE_EVENTS_FILTER_LIST_VALUE: null,


  /* Builds, Cars, Listings, Tuning, etc. */

  TOGGLE_CAR_TAG: null,

  TOGGLE_TUNING_TAGS: null,
  CLEAR_TUNING_TAGS: null,

  BUILDS_REQUEST: null,
  BUILDS_SUCCESS: null,
  BUILDS_ERROR: null,

  PARTS_REQUEST: null,
  PARTS_SUCCESS: null,
  PARTS_ERROR: null,

  DEALS_REQUEST: null,
  DEALS_SUCCESS: null,
  DEALS_ERROR: null,

  TAGS_REQUEST: null,
  TAGS_SUCCESS: null,
  TAGS_ERROR: null,

  CAR_REQUEST: null,
  CAR_SUCCESS: null,
  CAR_ERROR: null,

  CAT_REQUEST: null,
  CAT_SUCCESS: null,
  CAT_ERROR: null,

  MAKE_REQUEST: null,
  MAKE_SUCCESS: null,
  MAKE_ERROR: null,

  MODEL_REQUEST: null,
  MODEL_SUCCESS: null,
  MODEL_ERROR: null,

  SUBMODEL_REQUEST: null,
  SUBMODEL_SUCCESS: null,
  SUBMODEL_ERROR: null,

  SPECS_REQUEST: null,
  SPECS_SUCCESS: null,
  SPECS_ERROR: null,

  SPECS_DETAILS_REQUEST: null,
  SPECS_DETAILS_SUCCESS: null,
  SPECS_DETAILS_ERROR: null,

  SET_SELECTED_MAKE: null,
  SET_SELECTED_MODEL: null,
  SET_SELECTED_SUBMODEL: null,
  SET_SELECTED_SPECID: null,

  /* History */
  SAVE_PRODUCT: null,
  LOAD_PRODUCTS: null,

  SYNC_PRODUCT_REQ: null,
  SYNC_PRODUCT_SUCCESS: null,
  SYNC_PRODUCT_ERROR: null,

  DELETE_PRODUCT_REQ: null,
  DELETE_PRODUCT_SUCCESS: null,
  DELETE_PRODUCT_ERROR: null,

  FETCH_PRODUCT_REQ: null,
  FETCH_PRODUCT_SUCCESS: null,
  FETCH_PRODUCT_ERROR: null,

  SYNC_SPEC_REQ: null,
  SYNC_SPEC_SUCCESS: null,
  SYNC_SPEC_ERROR: null,

  DELETE_SPEC_REQ: null,
  DELETE_SPEC_SUCCESS: null,
  DELETE_SPEC_ERROR: null,

  FETCH_SPEC_REQ: null,
  FETCH_SPEC_SUCCESS: null,
  FETCH_SPEC_ERROR: null,

  SET_ACCESS_TOKEN: null,
  LOAD_ACCESS_TOKEN: null,

  /* Social Login and Profile */
  LOGIN: null,
  LOGGED_IN: null,
  UPDATE_EMAIL: null,
  UPDATE_PHONE: null,
  UPDATE_ADDRESS: null,
  UPDATE_CITY: null,
  UPDATE_STATE: null,
  UPDATE_COUNTRY: null,
  UPDATE_ZIP: null,

})
