'use strict'
import React, {Component, ListView, Text, View} from 'react-native'

import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'

import Part from './Part'
import ErrorPage from '../common/ErrorPage'
import F8Header from '../common/F8Header'
import TagsHeader from '../common/TagsHeader'
import LoadingPage from '../components/LoadingPage'

import {fetchPartsByManufacturer, togglePartTag} from '../reducers/tuning/filterActions'
import {partsByManufacturerSelector, partsByManufacturerPaginationSelector, selectedTagsSelector, categoryTagsSelector} from '../selectors'

import {union} from 'lodash'
import {General, btnColor} from '../styles'

import PartsList from '../components/PartsList'

const mapStateToProps = (state, props) => {
  return {
    parts: partsByManufacturerSelector (state, props),
    partsPagination: partsByManufacturerPaginationSelector (state, props),

    specId: props.specId,
    manufacturerId: props.manufacturerId,
    categoryName: props.categoryName,
    title: props.name
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchParts: (nextPageUrl, specId, tags) => {
      dispatch (fetchPartsByManufacturer (props.manufacturerId, nextPageUrl, specId, props.categoryName))
    },
    dispatch
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PartsList)
