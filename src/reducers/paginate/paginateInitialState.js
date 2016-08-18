'use strict'

const { Record } = require ('immutable')

const PaginateInitialState = Record ({
    isFetching: false,
    hasError: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
})

export default PaginateInitialState
