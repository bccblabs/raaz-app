'use strict'

import {connect} from 'react-redux'
import {fetchParts} from '../reducers/tuning/filterActions'
import {partsBySpecIdSelector, partsPaginationSelector, selectedTagsSelector} from '../selectors'
import PartsList from '../components/PartsList'

const mapStateToProps = (state, props) => {
  return {
    parts: partsBySpecIdSelector (state, props),
    partsPagination: partsPaginationSelector (state, props),
    tags: selectedTagsSelector (state, props),
    selectedTags: selectedTagsSelector (state, props),
    specId: props.specId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParts: (nextPageUrl, specId, selectedTags) => {
      dispatch (fetchParts (nextPageUrl, specId, selectedTags))
    },
    dispatch
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PartsList)
