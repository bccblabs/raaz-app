'use strict'

import React, {
  Component,
  View,
  ListView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Actions} from 'react-native-router-flux'
import {EmptyHeading} from '../common/F8Text'
import F8Button from '../common/F8Button'
import Post from './Post'
import {fetchPosts} from '../reducers/posts/postActions'
import {EmptyViewStyles} from '../styles'
import LoadingView from '../components/LoadingView'
import ErrorView from '../common/ErrorView'
import {union} from 'lodash'

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

  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds,
      data: [],
      postsPagination: props.postsPagination
    }
    this.renderRow = this.renderRow.bind(this)
  }

  componentWillMount () {
    this.props.fetchPosts()
  }

  componentWillReceiveProps (nextProps) {
    let {postsList, postsPagination} = nextProps
    if (nextProps.postsList !== this.props.postsList) {
      let newBlob = union (this.state.data, postsList)
      this.setState ({
        data: newBlob,
        dataSource: this.state.dataSource.cloneWithRows (newBlob),
        postsPagination
      })
    }
  }

  render () {
    let {dataSource, postsPagination} = this.state
      , emptyContent = (
        <View style={EmptyViewStyles.container}>
        <TouchableWithoutFeedback onPress={()=>this.props.fetchPosts()}>
          <EmptyHeading style={EmptyViewStyles.text}>
          {"No posts loaded, try loading again..."}
          </EmptyHeading>
        </TouchableWithoutFeedback>
        </View>
      )
      , listContent = (
        <ListView
          style={{flex: 1, marginBottom: 50, backgroundColor: '#FFF0F5'}}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderEmptyList={()=>{return emptyContent}}
          enableEmptySections={true}
          onEndReached={()=>{
            if (postsPagination.nextPageUrl) {
              this.props.fetchPosts (postsPagination.nextPageUrl)
            }
          }}
        />
      )
      , loadingContent = (
        <LoadingView/>
      )

    return listContent
  }

  renderRow (postData, rowId) {
    return (
      <Post data={postData}/>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostListView)
