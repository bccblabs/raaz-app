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


import Icon from 'react-native-vector-icons/Foundation';
import {Heading1, Heading3} from '../common/F8Text'
import MetricsGraph from '../components/MetricsGraph'
import {ListingStyles, Titles, General, FilterStyles, PartStyles} from '../styles'
import numeral from 'numeral'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import FullScreenLoadingView from '../components/FullScreenLoadingView'

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
          <FullScreenLoadingView/>
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
        listing
      } = this.state.data
      , dataArray = keys (partEffects).map((key)=>{return {name: key, value: partEffects[key]}})
      , socialContent = (
        <View style={{flexDirection:"row", justifyContent: 'flex-start'}}>
        <F8Button style={{}} type="tertiary" caption="10 likes"/>
        <F8Button style={{}} type="tertiary" caption="10 comments"/>
        </View>
      )
      , specsContent = dataArray && (<MetricsGraph data={[{entries: dataArray}]}/>)
      , installedParts = (
        <View>
        {socialContent}
        <Heading3 style={Titles.buildSectionTitle}>{"Specs"}</Heading3>
        {specsContent}
        <Heading3 style={Titles.buildSectionTitle}>{"Parts Installed"}</Heading3>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          style={PartStyles.partsScrollStyle}>
          {
            parts.map ((data, cidx)=> {
              let {name, medium, partId, recCnt} = data,
                  passProps = Object.assign ({}, data, {specId})
              return (
                <View style={PartStyles.partContainer}>
                <TouchableWithoutFeedback key={`pg-${cidx}`} onPress={()=>{Actions.PartDetails ({data: passProps})}}>
                  <Image
                    source={{uri: medium[0]}}
                    style={PartStyles.partImage}>
                  </Image>
                </TouchableWithoutFeedback>
                <Text style={PartStyles.partTitle}>{name}</Text>
                <Text style={PartStyles.rating}>{recCnt?recCnt:'n/a' + ' Recommendations'}</Text>
                </View>
              )
            })
          }
        </ScrollView>
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
          <F8Button
            type="secondary"
            caption="Inquire"
            onPress={()=>{Actions.Order ({...this.props.data})}}
            style={ListingStyles.contactDealerButton}/>
          </ScrollView>
        </View>
      )

    }
  }
}

export default connect () (BuildDetails)
