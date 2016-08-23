'use strict'

import React, { Component, View, ListView, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Actions} from 'react-native-router-flux'
import {EmptyHeading} from '../common/F8Text'
import F8Button from '../common/F8Button'
import Post from './Post'
import PureListView from '../common/PureListView'
import {fetchPosts} from '../reducers/posts/postActions'
import {EmptyViewStyles} from '../styles'
import FullScreenLoadingView from '../components/FullScreenLoadingView'


const filterHashSelector = (state) => (state.posts.postsFilterHash)
const postsSelector = (state) => (state.entities.posts)
const postsPaginationSelector = (state) => (state.pagination.postsPagination)


const getPostsEntities = createSelector (
  [filterHashSelector, postsSelector, postsPaginationSelector],
  (filterHash, postsList, postsPagination) => {
    let ids = postsPagination[filterHash]?postsPagination[filterHash].ids:[]
    console.log (ids)
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
    postsList: getPostsEntities(state),
    postsPagination: getPostsPagination(state)
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
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows (props.postsList),
      postsPagination: props.postsPagination
    }
    this.renderRow = this.renderRow.bind(this)
  }
  componentWillMount () {
    let {postsList, postsPagination} = this.props
    this.props.fetchPosts()
  }

  componentWillReceiveProps (nextProps) {
    let {postsList, postsPagination} = nextProps
    this.setState ({dataSource: this.state.dataSource.cloneWithRows (postsList), postsPagination})
    console.log (this.state.dataSource.getRowCount())
  }

  render () {
    let {dataSource, postsPagination} = this.state
      , listContent = (
        <ListView
          style={{flex: 1}}
          pageSize={10}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderEmptyList={this._renderEmptyList}
          enableEmptySections={true}
          onEndReached={()=>{
            console.log ('end of listview reached')
            if (postsPagination.nextPageUrl) {
              this.props.fetchPosts (postsPagination.nextPageUrl)
            }
          }}
        />
      )
      , loadingContent = (
        <FullScreenLoadingView/>
      )
      , emptyContent = (
        <View style={EmptyViewStyles.container}>
        <TouchableWithoutFeedback onPress={()=>this.props.fetchPosts()}>
          <EmptyHeading style={EmptyViewStyles.text}>
          {"No posts loaded, try loading again..."}
          </EmptyHeading>
        </TouchableWithoutFeedback>
        </View>
      )

    // if (postsPagination.isFetching) return loadingContent
    // if (postsPagination.hasError || dataSource.getRowCount() < 1) return emptyContent
    // else return listContent
    return listContent
  }

  renderRow (postData, rowId) {
    return (
      <Post data={postData}/>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostListView)
