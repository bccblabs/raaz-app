'use strict'

import {connect} from 'react-redux'

import {fetchPartsByManufacturer} from '../reducers/tuning/filterActions'
import {partsByManufacturerSelector, partsByManufacturerPaginationSelector} from '../selectors'

import PartList from './PartList'

const mapStateToProps = (state, props) => {
  return {
    data: partsByManufacturerSelector (state, props),
    pagination: partsByManufacturerPaginationSelector (state, props),

    specId: props.specId,
    manufacturerId: props.manufacturerId,
    categoryName: props.categoryName,
    title: props.name
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (nextPageUrl) => {
      dispatch (fetchPartsByManufacturer (props.manufacturerId, nextPageUrl, props.specId, props.categoryName))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PartList)
