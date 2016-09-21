'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import Post from '../Posts/Post'
import Build from '../tuning/Build'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {fetchCarDetails} from '../reducers/tuning/filterActions'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import {Heading1, Heading2, Heading3, EmptyHeading, Paragraph} from '../common/F8Text'

import FullScreenLoadingView from '../components/FullScreenLoadingView'
import MetricsGraph from '../components/MetricsGraph'
import PartsGrid from './PartsGrid'
import PostsList from '../Posts/PostListView'
import {VRImage} from '../cardboard'

import {Styles, TuningBySpecStyles, SliderStyles} from '../styles'
const specIdSelector = (state) => (state.stockCar.selectedSpecId)
const specDetailsSelector = (state) => (state.entities.specDetails)
const specDetailsPagination = (state) => (state.pagination.specDetailsPagination)


const getSpecsDetailsEntities = createSelector (
  [specIdSelector, specDetailsSelector, specDetailsPagination],
  (specId, specsList, specsPagination) => {
    let ids = specsPagination[specId]?specsPagination[specId].ids:[]
    return ids.map (id=>specsList[id])
  }
)

const getSpecsDetailsPagination = createSelector (
  [specIdSelector, specDetailsPagination],
  (specId, specsPagination) => {
    return specsPagination[specId] || {}
  }
)


const mapStateToProps = (state) => {
  return {
    specsDetails: getSpecsDetailsEntities(state),
    specsPagination: getSpecsDetailsPagination(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecsDetails: (specId)=>{
      dispatch (fetchCarDetails (specId))
    }
  }
}

class TuningBySpec extends Component {

  constructor (props) {
    super (props)
    this.state = {
      specsDetails: props.specsDetails,
      specsPagination: props.specsPagination,
    }
  }

  componentWillMount () {
    let {specId, fetchSpecsDetails} = this.props
    fetchSpecsDetails(specId)
  }

  componentWillReceiveProps (nextProps) {
    let {specsPagination, specsDetails} = nextProps
      , specsInfo = this.state.specsDetails[0]
    this.setState ({
      specsDetails,
      specsPagination,
    })
  }


  render () {
    let {specsDetails, specsPagination} = this.state
      , specsInfo = this.state.specsDetails[0]
    if (specsPagination.isFetching || !specsInfo) return (<FullScreenLoadingView/>)
    else {
      const leftItem = {title: 'Back', onPress: ()=> {Actions.pop ()}}
          , headerComponent = (<F8Header foreground="light" leftItem={leftItem}/>)
          , {make, model, submodel, specId, tuning, specs, posts} = specsInfo

      let {
            cylinders, compressor, configuration,
            transmissionSpeed, transmission, drivenWheels, size,
          } = specs
        , graphKeys = ['horsepower', 'torque']

      const dataArray = graphKeys.map ((key)=>{return {name: key, value: specs[key]}})

      let tuningcomponent = (specsInfo.tuning && specsInfo.tuning.length )?(
        <View>
          <Heading3 style={SliderStyles.sliderTitle}>{"Tuning By Categories"}</Heading3>
          <PartsGrid data={tuning} specId={specId}/>
          <F8Button onPress={()=>{Actions.TuningPager({specId})}} type="secondary" caption="Search Tuning!" style={Styles.contactDealerButton}/>
        </View>
      ): (<View/>)
        return (
          <ParallaxScrollView
            backgroundColor="black"
            contentBackgroundColor="white"
            backgroundSpeed={1}
            parallaxHeaderHeight={300}
            renderFixedHeader={() => headerComponent}
            renderForeground={()=>{
              return (<View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                          <Heading1>{make}</Heading1>
                          <Heading1>{model}</Heading1>
                          <Heading1>{submodel}</Heading1>
                     </View>)

            }}
            renderBackground={() => <VRImage style={TuningBySpecStyles.VRImageHolder}/>}>
            <View style={{flex: 1}}>
            <Heading3 style={SliderStyles.sliderTitle}>{"Specs"}</Heading3>
            <View style={{padding: 16}}>
            <Heading3 style={TuningBySpecStyles.subtitle}>{size.toFixed(1) + ` L ${configuration}-${cylinders} ${compressor}`}</Heading3>
            <Heading3 style={TuningBySpecStyles.subtitle}>{`${transmissionSpeed} speed ${transmission}`}</Heading3>
            <Heading3 style={TuningBySpecStyles.subtitle}>{`${drivenWheels}`}</Heading3>
            <MetricsGraph data={[{entries:dataArray}]}/>
            </View>
            {tuningcomponent}
            </View>
            <Heading3 style={SliderStyles.sliderTitle}>{"Posts"}</Heading3>
            {
              posts.map ((post, idx)=>{
                console.log (post)
                if (post.labels.indexOf ('Build') > -1) return (<Build key={`pl-${idx}`} data={post}/>)
                else return (<Post data={post} key={`pl-${idx}`}/>)
              })
            }
          <F8Button onPress={()=>{Actions.PostsBySpecId({specId})}} type="secondary" caption="View All Posts" style={Styles.contactDealerButton}/>
          </ParallaxScrollView>
        );
    }
  }
  renderRow (postData, rowId) {
    return (
      <Post data={postData}/>
    )
  }

}

export default connect (mapStateToProps, mapDispatchToProps) (TuningBySpec)
