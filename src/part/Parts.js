'use strict'

import {connect} from 'react-redux'

import {fetchParts} from '../reducers/tuning/filterActions'
import {partsBySpecIdSelector, partsPaginationSelector, selectedTagsSelector} from '../selectors'

import PartList from './PartList'

const mapStateToProps = (state, props) => {
  return {
    data: partsBySpecIdSelector (state, props),
    pagination: partsPaginationSelector (state, props),

    tags: [],
    selectedTags: selectedTagsSelector (state, props),
    specId: props.specId
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (nextPageUrl) => {
      console.log('fetch parts', props)
      dispatch (fetchParts (nextPageUrl, props.specId, props.selectedTags))
    },
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PartList)
