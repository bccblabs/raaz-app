'use strict'

const {Map, Record} = require ('immutable')

const userInitialState = Record ({
  profileData: new (Record ({
    updated_time: null,
    locale: null,
    user_id: null,
    user_name: null,
    picture: null,
    name: null,

    zipcode: null,
    address: null,
    state: null,
    city: null,
    country: null,

    phone: null,
    email: null,

    followers: 0,
    following: 0,

    facebook: null,
    instagram: null,

    specsHistory: new (Map)
  })),

  loginType: null,

})

export default userInitialState
