'use strict'

import React, {
  Component,
  Image,
  ScrollView,
  Text,
  View
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import RequestUtils from '../requests'

import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import {Heading3, Paragraph} from '../common/F8Text'

import LoadingView from '../components/LoadingView'
import ErrorView from '../common/ErrorView'
import MetricsGraph from '../components/MetricsGraph'
import SaveProductButton from '../components/SaveProductButton'

import {General, Titles, DetailStyles, PostStyles, Specs} from '../styles'


export default class PartDetails extends Component {
  constructor (props) {
    super (props)
    this.state = {
      hasError: false,
      isLoading: true
    }

    this.fetchPartDetails = this.fetchPartDetails.bind (this)
  }

  async fetchPartDetails () {
    try {
      let {partId, specId} = this.props.data
        , data = await RequestUtils.fetchPartDetails (partId, specId)
      console.log('PartDetails',{data})
      this.setState ({
        hasError: false,
        isLoading: false,
        data: data,
      })

    } catch (err) {
      this.setState ({hasError: true, isLoading: false})
    }
  }

  componentWillMount () {
    this.fetchPartDetails ()
  }

  render() {
    let {partId} = this.props.data, content
    const leftItem = {
            title: 'Back',
            onPress: ()=> {Actions.pop()}
          }
        , rightItem = {
          title: 'Listings',
          onPress: ()=> {Actions.Listings({partId})}
        }
        , {data, hasError, isLoading} = this.state
        , header = (
            <F8Header
              foreground="dark"
              style={General.headerStyle}
              leftItem={leftItem}
              rightItem={rightItem}/>
        )

    if (isLoading) {
      return (<View style={{flex: 1}}>{header}<LoadingView/></View>)
    }
    else if (hasError) {
      return (<View style={{flex: 1}}>{header}<ErrorView/></View>)
    }
    else {
      let {part, manufacturer, listings, comments, tuning, buildCnt} = data
        , {name, partId, details, description, media} = part
        , {emission, included} = tuning
        , graphKeys = [
          'tqGain', 'hpGain', 'maxHp', 'maxTq', 'labor', 'weight',
          'rearLowering', 'frontLowering',
          'rearSpringRateStiffness','frontSpringRateStiffness']

        , dataArray = graphKeys.map ((key)=>{return {name: key, value: tuning[key]}})
        , specsContent = dataArray && (<MetricsGraph data={[{entries: dataArray}]}/>)
        , foregroundContent = (
          <View style={DetailStyles.foregroundContainer}>
          <Text style={DetailStyles.partTitle}>{name}</Text>
            {manufacturer && (
              <View style={{flex: 1, backgroundColor: 'white', height: 20, width: 80, marginVertical: 8}}>
              <Image source={{uri: manufacturer.logo}}
                      style={PostStyles.manufacturerLogo}/>
              </View>
            )
            }
          </View>
        )
        , images = (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            {media.map ((mediaLink, idx)=> (<Image key={`${partId}-${idx}`} style={DetailStyles.scrollImage} source={{uri:mediaLink}}/>))}
          </ScrollView>

        )
      return (
        <View style={{flex: 1}}>
        <ParallaxScrollView
          backgroundColor="transparent"
          contentBackgroundColor="white"
          backgroundSpeed={1}
          parallaxHeaderHeight={300}
          renderFixedHeader={() => header}
          stickyHeaderHeight={64}
          renderForeground={()=>{return foregroundContent}}
          renderBackground={() => <Image source={{uri: media[0]}} style={DetailStyles.VRImageHolder}/>}
          >
          <View style={{margin:16}}>
          {images}
          <SaveProductButton style={{margin: 16}} part={Object.assign ({}, {...part}, {...tuning}, {specId: this.state.specId})}/>
          {
            specsContent && (
              <View style={DetailStyles.descriptionContainer}>
              <Paragraph style={Titles.filterSectionTitle}>{"SPECS"}</Paragraph>
              {specsContent}
              </View>
            )
          }
          {description && description.length && (
            <View style={DetailStyles.descriptionContainer}>
            <Paragraph style={Titles.filterSectionTitle}>{"DESCRIPTION"}</Paragraph>
            <Heading3 style={[Specs.subtitle, {alignSelf: 'flex-start', margin: 4}]}>{`${description}`}</Heading3>
            </View>
          )}

          {details && details.length && (
            <View style={DetailStyles.descriptionContainer}>
            <Paragraph style={Titles.filterSectionTitle}>{"DETAILS"}</Paragraph>
            {
              details.map ((detail, idx)=> {
                return (
                  <Heading3 key={`dtls-${idx}`}  style={[Specs.subtitle, {alignSelf: 'flex-start', margin: 4}]}>{`- ${detail}`}</Heading3>
                )
              })
            }
            </View>
          )}
          </View>
        </ParallaxScrollView>
        <F8Button
          style={DetailStyles.bottomButton}
          type="tertiary" caption={`${buildCnt} Builds`}
          icon={require ('../common/img/tuning.png')}
          onPress={()=>Actions.BuildsByPartId ({partId})}
        />
        </View>
      )
    }
  }
}
