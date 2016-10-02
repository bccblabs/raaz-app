'use strict'

import React, { View, Component } from 'react-native'
import { Provider, connect } from 'react-redux'
var FacebookSDK = require ('FacebookSDK')

import { setStore } from './reducers/global/globalActions'
import { loadProductIds, loadSpecIds, loadAccessToken } from './reducers/history/historyActions'
import { asyncStorageEngine, configureStore } from './store/configureStore'
import * as storage from 'redux-storage'


import globalInitialState from './reducers/global/globalInitialState'
import historyInitialState from './reducers/history/historyInitialState'
import stockCarFilterInitialState from './reducers/stockCar/filterInitialState'
import tuningFilterInitialState from './reducers/tuning/filterInitialState'
import userInitialState from './reducers/user/userInitialState'
import postInitialState from './reducers/posts/postInitialState'
import newpostInitialState from './reducers/newpost/newpostInitialState'

import Raaz from './Raaz'

function getInitialState () {
  const _initState = {
    global: new globalInitialState,
    history: new historyInitialState,
    stockCar: new stockCarFilterInitialState,
    tuning: new tuningFilterInitialState,
    user: new userInitialState,
    posts: new postInitialState,
  }
  return _initState
}

function setup (): Component {

  FacebookSDK.init()

  class Root extends Component {
    constructor (props) {
      super(props)
      const load = storage.createLoader(asyncStorageEngine),
            store = configureStore(getInitialState())
      load(store)
          .then((history) => {
            store.dispatch (loadAccessToken (history))
            this.setState ({isLoading: false})
          })
      this.state = {
        isLoading: true,
        store: store
      }
    }

    render () {
      return this.state.isLoading
      ? <View/>
      : <Provider store={this.state.store}><Raaz/></Provider>
    }
  }

  return Root
}

module.exports = setup
