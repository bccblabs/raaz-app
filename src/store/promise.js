/**
  if action is of type promise, then return Promise.resolve (action)
*/

'use strict'

function warn (err) {
  console.warn (err.message || err)
  throw err
}

module.exports = store => next => action => {
  typeof action.then === 'function'
    ? Promise.resolve (action).then (next, warn)
    : next (action)
}
