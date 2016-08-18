/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict';

const {
  LOGIN,
  LOGGED_IN,
  LOGGED_OUT,
} = require ('../../constants').default

const InitialState = require ('./userInitialState').default
const initialState = new InitialState
var _ = require ('lodash')
var Immutable = require ('immutable')

import {Schema, arrayOf, normalize} from 'normalizr'
const identitySchema = new Schema ('identities', {idAttribute: 'provider'})
identitySchema.define ({identities: arrayOf (identitySchema)})

export default function userReducer (state=initialState, action) {
  if (!(state instanceof InitialState)) return state.merge (initialState)
  switch (action.type) {
    case LOGIN: {
      let {loginType} = action.payload
      return state.setIn (['loginType'], loginType, (val)=>loginType)
    }

    case LOGGED_IN : {
      let {
        identities,
        picture,
        name,
        locale,
        user_id,
        updated_time
      } = action.payload,
        normalized_identities = normalize (action.payload, identitySchema)

      let {facebook, instagram} = normalized_identities

      return state.setIn (['profileData', 'picture'], picture, (val)=> picture)
                  .setIn (['profileData', 'name'], name, (val)=> name)
                  .setIn (['profileData', 'locale'], locale, (val)=> locale)
                  .setIn (['profileData', 'user_id'], user_id, (val)=> user_id)
                  .setIn (['profileData', 'updated_time'], updated_time, (val)=> updated_time)
                  .setIn (['profileData', 'facebook'], facebook, (val)=> facebook)
                  .setIn (['profileData', 'instagram'], instagram, (val)=> instagram)
    }

    case LOGGED_OUT: {
      return initialState
    }
    default: {
      return state;
    }
  }
}

module.exports = userReducer;
