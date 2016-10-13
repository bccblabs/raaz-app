'use strict'

import React, {
  Component,
  Image,
  ScrollView,
  Text,
  View
} from 'react-native'

import RequestUtils from '../requests'
import ViewPager from 'react-native-viewpager'

import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import {createSelector} from 'reselect'


import {Heading1, Heading2, Heading3, Paragraph} from '../common/F8Text'
import MetricsGraph from '../components/MetricsGraph'
import {syncProduct} from '../reducers/history/historyActions'
import {Styles, General, Titles, TuningBySpecStyles} from '../styles'

import F8Button from '../common/F8Button'
import SaveProductButton from '../components/SaveProductButton'
import F8Header from '../common/F8Header'
import LoadingView from '../components/LoadingView'

class PartDetails extends Component {
  constructor (props) {
    super (props)
    let mediaDataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2})
      , {data} = props

    this.state = {
      mediaDataSource: mediaDataSource,
      partId: data.partId,
      specId: data.specId,

      hasError: false,
      isLoading: true
    }

    this.fetchPartDetails = this.fetchPartDetails.bind (this)
  }

  async fetchPartDetails () {
    try {
      let {partId, specId} = this.state
        , data = await RequestUtils.fetchPartDetails (partId, specId)
        , mediaDataSource = this.state.mediaDataSource.cloneWithPages (data.part.media)

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
    this.fetchPartDetails ()
  }

  render() {
    const leftItem = {
            title: 'Back',
            onPress: ()=> {Actions.pop()}
          }
        , {data, hasError, isLoading} = this.state

    if (isLoading) return (<LoadingView/>)
    else {
      let {part, manufacturer, listings, comments, tuning} = data
        , {name, partId, details, description} = part
        , {emission, included} = tuning
        , graphKeys = [
          'tqGain', 'hpGain', 'maxHp', 'maxTq', 'labor', 'weight',
          'rearLowering', 'frontLowering',
          'rearSpringRateStiffness','frontSpringRateStiffness']
        , dataArray = graphKeys.map ((key)=>{return {name: key, value: tuning[key]}})
        , manufacturerContent = manufacturer && (
          <View style={{flexDirection: 'row', padding: 8, justifyContent: 'flex-start'}}>
            <Image source={{uri: manufacturer.logo}} resizeMode="contain" style={{height: 16, flex: 1}}/>
          </View>
        )
        , specsContent = dataArray && (<MetricsGraph data={[{entries: dataArray}]}/>)
      return (
        <View style={{flex: 1}}>
          <F8Header
            foreground="dark"
            leftItem={leftItem}
            style={General.headerStyle}/>
            <ScrollView>
              <Heading1 style={{padding:16,color: 'black'}}>{name}</Heading1>
              <ViewPager
                renderPage={(media)=>{return (<Image source={{uri:media, resizeMode: 'contain'}} style={Styles.largeImageStyle}/>)}}
                dataSource={this.state.mediaDataSource}
              />
              {manufacturerContent}
              <SaveProductButton part={Object.assign ({}, {...part}, {...tuning}, {specId: this.state.specId})}/>
              <View style={{paddingBottom: 49}}>
              {
                specsContent && (
                  <View>
                  <Paragraph style={Titles.filterSectionTitle}>{"SPECS"}</Paragraph>
                  {specsContent}
                  </View>
                )
              }
              {description && (
                <View>
                <Paragraph style={Titles.filterSectionTitle}>{"DESCRIPTION"}</Paragraph>
                <Heading3 style={TuningBySpecStyles.subtitle}>{description}</Heading3>
                </View>
              )}

              {details && (
                <View>
                <Paragraph style={Titles.filterSectionTitle}>{"DETAILS"}</Paragraph>
                {
                  details.map ((detail, idx)=> {
                    return (
                      <Heading3 key={`dtls-${idx}`} style={TuningBySpecStyles.subtitle}>{description}</Heading3>
                    )
                  })
                }
                </View>
              )}

              </View>
              </ScrollView>
              <F8Button
                type="secondary"
                caption="View All Listings"
                onPress={()=>{Actions.Order ({})}}
                style={General.bottomButtonStyle}/>
        </View>
      )
    }
  }
}

export default connect () (PartDetails)
