'use strict'

import {connect} from 'react-redux'
import {postByBuildIdSelector, postPaginationByBuildIdSelector} from '../selectors'
import {fetchPostsByBuildId} from '../reducers/posts/postActions'

import PostList from './PostList'

const mapStateToProps = (state, props) => {
  return {
    data: postByBuildIdSelector(state, props),
    pagination: postPaginationByBuildIdSelector(state, props)
    title: 'Posts'
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (pageUrl) => {dispatch (fetchPostsByBuildId (pageUrl, props.buildId))}
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostList)
