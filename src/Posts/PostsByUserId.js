'use strict'

import {connect} from 'react-redux'
import {postByUserIdSelector, postPaginationByUserIdSelector} from '../selectors'
import {fetchPostsByUserId} from '../reducers/posts/postActions'

import PostList from './PostList'

const mapStateToProps = (state) => {
  return {
    data: postByUserIdSelector(state),
    pagination: postPaginationByUserIdSelector(state),
    title: props.userName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (pageUrl) => {dispatch (fetchPostsByUserId (pageUrl, props.userId))}
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostList)
