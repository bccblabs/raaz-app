'use strict'

import React, {
  Component,
  Image,
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'

import RequestUtils from '../requests'
import keys from 'lodash/keys'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import {createSelector} from 'reselect'

import Part from './Part'

import Icon from 'react-native-vector-icons/Foundation';
import {Heading1, Heading3} from '../common/F8Text'
import MetricsGraph from '../components/MetricsGraph'
import {ListingStyles, Titles, General, PartStyles} from '../styles'
import numeral from 'numeral'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import LoadingView from '../components/LoadingView'
import LikeBtn from '../common/LikeBtn'
import CommentBtn from '../common/CommentBtn'

var ViewPager = require('react-native-viewpager');

class BuildDetails extends Component {
  constructor (props) {
    super (props)
    let viewPagerDataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2})
    this.state = {
      mediaDataSource: viewPagerDataSource,
      buildId: this.props.buildId,
      hasError: false,
      isLoading: true
    }
    this.fetchBuildDetails = this.fetchBuildDetails.bind (this)
  }

  async fetchBuildDetails () {
    try {
      let {buildId} = this.state
        , data = await RequestUtils.fetchBuildDetails (buildId)
        , mediaDataSource = this.state.mediaDataSource.cloneWithPages (data.media)
      this.setState ({
        hasError: false,
        isLoading: false,
        data: data,
        mediaDataSource: mediaDataSource
      })
    } catch (err) {
      this.setState ({hasError: true, isLoading: false})
    }
  }


  componentWillMount () {
    this.fetchBuildDetails ()
  }

  render() {
    let {hasError, isLoading} = this.state
    , {dispatch, name} = this.props
    , leftItem = {
      title: 'Close',
      onPress: Actions.pop
    }
    , rightItem = {
      title: 'Save',
      onPress: ()=> {this.props.dispatch (saveToHistory(this.props.data))}
    }
    , headerContent = (
      <F8Header
        foreground="dark"
        leftItem={leftItem}
        rightItem={rightItem}
        style={General.headerStyle}/>
    )
    if (isLoading) {
      return (
        <View style={{flex: 1}}>
          {headerContent}
          <LoadingView/>
        </View>
      )
    }
    else if (hasError) {
      return (
        <View style={{flex: 1}}>
          {headerContent}
          <Text>{"Error Occurred..."}</Text>
        </View>
      )
    } else {
      let {
        parts,
        created,
        buildId,
        name,
        media,
        dealer,
        specId,
        partEffects,
        listing,
        likes,
        comments,
      } = this.state.data
      , dataArray = keys (partEffects).map((key)=>{return {name: key, value: partEffects[key]}})
      , socialContent = (
        <View style={{flexDirection:"row", justifyContent: 'flex-start'}}>
          <LikeBtn postId={buildId} numlikes={likes.length}/>
          <CommentBtn postId={buildId} commentsCnt={comments}/>
        </View>
      )
      , specsContent = dataArray && (<MetricsGraph data={[{entries: dataArray}]}/>)
      , installedParts = (
        <View>
        {socialContent}
        <Heading3 style={Titles.buildSectionTitle}>{"SPECS"}</Heading3>
        {specsContent}
        <Heading3 style={Titles.buildSectionTitle}>{"PARTS INSTALLED"}</Heading3>
        <View>
        {
          parts.map ((data, cidx)=> {
            return (
              <Part key={`p-${cidx}`} data={data} specId={specId}/>
            )
          })
        }
        </View>
        </View>
      )
      return (
        <View style={{flex: 1}}>
          {headerContent}
          <ScrollView style={General.topLevelScrollStyle}>
          <Heading1 style={Titles.buildTitle}>{name}</Heading1>
            {listing && (
              <View style={ListingStyles.listingSection}>
                <Icon name="price-tag" size={24} color={"red"}/>
                <Text style={ListingStyles.priceLargeTitle}>{`$${numeral(listing.amount).format ('0,0')} ${listing.currency}`}</Text>
              </View>
            )}
            <ViewPager
              renderPageIndicator={()=>(<View/>)}
              renderPage={(media)=>{
                return (<Image source={{uri:media}} style={General.largeImageStyle}/>)
              }}
              dataSource={this.state.mediaDataSource}/>
          {installedParts}
          </ScrollView>
          <F8Button
            type="secondary"
            caption="Inquire"
            onPress={()=>{Actions.Order ({...this.props.data})}}
            style={General.bottomButtonStyle}/>
        </View>
      )

    }
  }
}

export default connect () (BuildDetails)
