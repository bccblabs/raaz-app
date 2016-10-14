'use strict'

import {connect} from 'react-redux'
import {postByBuildIdSelector, postPaginationByBuildIdSelector} from '../selectors'
import {fetchPostsByBuildId} from '../reducers/posts/postActions'

import PostList from './PostList'

const mapStateToProps = (state) => {
  return {
    data: postByBuildIdSelector(state),
    pagination: postPaginationByBuildIdSelector(state)
    title: 'Posts'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (pageUrl) => {dispatch (fetchPostsByBuildId (pageUrl, props.buildId))}
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostList)
