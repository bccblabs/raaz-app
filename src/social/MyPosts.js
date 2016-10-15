'use strict'

import React, {Component} from 'react-native'

import {connect} from 'react-redux'
import PostsByUserId from '../Posts/PostsByUserId'
import {BuildsByUserId} from '../build'

import ProfileContainer from './ProfileContainer'
import F8Button from '../common/F8Button'

import {profileSelector, userIdSelector} from '../selectors'

const mapStateToProps = (state) => {
  return {
    profileData: profileSelector (state),
    userId: userIdSelector (state),
  }
}

const mapDispatchToProps = (dispatch) => {return {dispatch}}

class MyPosts extends Component {
  render () {
  	let {userId, profileData} = this.props
	  , listContent = (<PostsByUserId userId={userId}/>)
	  , btnContent = (<F8Button type="tertiary" caption="Add New Post" icon={require ('../common/img/comment.png')}/>)
   
    return (
    	<ProfileContainer 
	    	profileData={profileData} 
	    	listContent={listContent}
	    	btnContent={btnContent}
    	/>)
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (MyPosts)
