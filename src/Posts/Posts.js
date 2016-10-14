'use strict'

import {connect} from 'react-redux'
import {homePostSelector, homePostPaginationSelector} from '../selectors'
import {fetchPosts} from '../reducers/posts/postActions'

import PostList from './PostList'

const mapStateToProps = (state) => {
  return {
    data: homePostSelector(state),
    pagination: homePostPaginationSelector(state)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (pageUrl) => {
      dispatch (fetchPosts (pageUrl, props.userId))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostList)
