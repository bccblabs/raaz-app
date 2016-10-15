'use strict'

import React, {Component} from 'react-native'

import {connect} from 'react-redux'
import {BuildsByUserId} from '../build'

import ProfileContainer from './ProfileContainer'
import F8Button from '../common/F8Button'

import {profileSelector, userIdSelector} from '../selectors'

const mapStateToProps = (state, props) => {
	return {
		profileData: profileSelector (state),
		userId: userIdSelector (state),
	}
}

const mapDispatchToProps = (dispatch) => {return {dispatch}}

class MyBuilds extends Component {
	render () {
	  	let {userId, profileData} = this.props
		  , listContent = (<BuildsByUserId userId={userId}/>)
		  , btnContent = (<F8Button type="tertiary" caption="Add New Build" icon={require ('../common/img/tuning.png')}/>)
		return (
			<ProfileContainer 
				profileData={profileData} 
				listContent={listContent}
				btnContent={btnContent}
				/>)
		}
}

export default connect (mapStateToProps, mapDispatchToProps) (MyBuilds)
