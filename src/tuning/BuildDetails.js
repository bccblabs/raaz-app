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
import {Heading1, Heading2, Heading3, Paragraph} from '../common/F8Text'
import MetricsGraph from '../components/MetricsGraph'
import {PostStyles, Styles, TuningBySpecStyles, FilterStyles, SliderStyles, FilterCardStyles} from '../styles'
import numeral from 'numeral'
import moment from 'moment'

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

      console.log (data)
      this.setState ({
        hasError: false,
        isLoading: false,
        data: data,
        mediaDataSource: mediaDataSource
      })
    } catch (err) {
      console.log ('build details fetch err = ', err)
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
        style={FilterStyles.headerStyle}/>
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
      , specsContent = dataArray && (<MetricsGraph data={[{entries: dataArray}]}/>)
      , installedParts = (
        <View>
        {specsContent}
        <Heading3 style={[SliderStyles.sliderTitle, {marginTop: 16}]}>{"Parts Installed"}</Heading3>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={[SliderStyles.horizontalScrollContainer, {backgroundColor: '#FFF0F5', margin: 8}]}
          contentContainerStyle={[Styles.scrollContainer, {paddingHorizontal: 4, paddingVertical: 0}]}>
          {
            parts.map ((data, cidx)=> {
              let {name, medium, partId} = data,
                  passProps = Object.assign ({}, data, {specId})
              return (
                <View style={{height:200, width: 200, margin: 8, backgroundColor: 'white'}}>
                <TouchableWithoutFeedback key={`pg-${cidx}`} onPress={()=>{Actions.PartDetails ({data: passProps})}}>
                  <View style={FilterCardStyles.containerStyle}>
                    <Image
                      source={{uri: medium[0]}}
                      style={{height:200, width: 200, resizeMode: 'contain'}}>
                    </Image>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={FilterCardStyles.partTextStyle}>{name}</Text>
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
          <ScrollView style={Styles.topLevelScrollStyle} containerStyle={Styles.topScrollContainerStyle}>
          <Heading1 style={{padding:16,color: 'black', justifyContent: 'flex-start'}}>{name}</Heading1>
            {listing && (
              <View style={PostStyles.listingSection}>
                <Icon name="price-tag" size={30} color={"red"}/>
                <Text style={PostStyles.price}>{`$${numeral(listing.amount).format ('0,0')} ${listing.currency}`}</Text>
              </View>
            )}
            <ViewPager
              renderPageIndicator={()=>(<View/>)}
              renderPage={(media)=>{
                return (<Image source={{uri:media}} style={Styles.largeImageStyle}/>)
              }}
              dataSource={this.state.mediaDataSource}/>
          {installedParts}
          <F8Button
            type="secondary"
            caption="Inquire"
            onPress={()=>{Actions.Order ({...this.props.data})}}
            style={Styles.contactDealerButton}/>
          </ScrollView>
        </View>
      )

    }
  }
}

export default connect () (BuildDetails)
