'use strict'

import React, { Component, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Actions} from 'react-native-router-flux'
import {EmptyHeading} from '../common/F8Text'
import F8Button from '../common/F8Button'
import Post from './Post'
import PureListView from '../common/PureListView'
import {fetchPosts} from '../reducers/posts/postActions'
import {EmptyViewStyles} from '../styles'

// text string fields
const filterHashSelector = (state) => (state.posts.postsFilterHash)
const postsSelector = (state) => (state.entities.posts)
const postsPaginationSelector = (state) => (state.pagination.postsPagination)


const getPostsEntities = createSelector (
  [filterHashSelector, postsSelector, postsPaginationSelector],
  (filterHash, postsList, postsPagination) => {
    let ids = postsPagination[filterHash]?postsPagination[filterHash].ids:[]
    return ids.map (id=>postsList[id])
  }
)

const getPostsPagination = createSelector (
  [filterHashSelector, postsPaginationSelector],
  (filterHash, postsPagination) => {
    return postsPagination[filterHash] || {}
  }
)


const mapStateToProps = (state) => {
  return {
    postsList: state.postsList,
    postsPagination: state.postsPagination
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (pageUrl) => {
      dispatch (fetchPosts (pageUrl))
    }
  }
}

class PostListView extends Component {

  _innerRef: ?PureListView;

  constructor (props) {
    super (props)
    this.state = {
      postsList: props.postsList,
      postsPagination: props.postsPagination
    }
    this._innerRef = null
    this.renderRow = this.renderRow.bind(this)
    this.storeInnerRef = this.storeInnerRef.bind(this)
    this._renderEmptyList = this._renderEmptyList.bind (this)
  }

  componentWillReceiveProps (nextProps) {
    let {postsList, postsPagination} = nextProps
    this.setState ({postsList, postsPagination})
  }

  _renderEmptyList () {
    return (
      <View style={{flex: 1, paddingTop: 180}}>
        <F8Button onPress={Actions.NewPost} type="tuningSub" caption="Yo Post Something!"/>
      </View>
    )
  }

  render () {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={[]}
        renderRow={this.renderRow}
        renderEmptyList={this._renderEmptyList}
        {...this.props}
      />
    )
  }

  renderRow (postData, rowId) {
    return (
      <Post key={rowId} data={postData}/>
    )
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostListView)
