'use strict'

import React, {Component} from 'react-native'

import F8Button from './F8Button'

import {connect} from 'react-redux'

import {isLikedByUser} from '../selectors'

import {togglePostLike} from '../reducers/user/userActions'

const mapStateToProps = (state) => {
  return {
    isLiked: isLikedByUser (state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (postId) => {dispatch (likePost (postId))}
  }
}

class LikeBtn extends Component {
  constructor (props) {
    super (props)
    this.state = {
      isLiked: props.isLiked,
      numlikes: props.numlikes
    }
  }

  componentWillReceiveProps (nextProps) {
    let {isLiked, numlikes} = nextProps
    this.setState ({isLiked, numlikes})
  }

  render () {
    let {isLiked, numlikes} = this.state
      , {togglePostLike, postId} = this.props

    if (isLiked) {
      return (
        <F8Button
          onPress={()=>{togglePostLike (postId)}}
          type="liked" caption="liked!"
          icon={require ('../common/img/like.png')}
        />
      )
    }
    else {
      return (
        <F8Button
          onPress={()=>{togglePostLike (postId)}}
          type="tertiary" caption={`${numlikes} likes`}
          icon={require ('../common/img/like.png')}
        />
      )
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (LikeBtn)
