/**
  if action is of type array, then map action to all elems
*/

'use strict'

module.exports = store => next => action => {
  Array.isArray (action)?action.map(next):next(action)
}
