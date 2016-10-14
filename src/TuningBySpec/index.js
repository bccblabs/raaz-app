'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  WebView,
  Text,
} from 'react-native'

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {fetchCarDetails, fetchCategoriesFromApi} from '../reducers/tuning/filterActions'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import {Heading1, Heading2, Heading3, EmptyHeading, Paragraph} from '../common/F8Text'

import LoadingView from '../components/LoadingView'
import ErrorView from '../common/ErrorView'
import Manufacturers from './Manufacturers'
import MetricsGraph from '../components/MetricsGraph'
import PostCard from '../Posts/PostCard'

import {VRImage} from '../cardboard'

import {DetailStyles, General, Specs, Titles, PartStyles, PostStyles} from '../styles'

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
    },
    fetchCategories: (key)=> {
      dispatch (fetchCategoriesFromApi (key))
    },
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
    let {specId, fetchSpecsDetails, fetchCategories} = this.props
    fetchSpecsDetails(specId)
    fetchCategories (specId)
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
    if (specsPagination.isFetching) return (<LoadingView/>)
    else if (specsPagination.hasError || !specsInfo) return (<ErrorView onPress={()=>this.props.fetchSpecsDetails (this.props.specId)}/>)
    else {
      const leftItem = {title: 'Back', onPress: ()=> {Actions.pop ()}}
          , {make, model, submodel, specId, tuning, specs, posts} = specsInfo
          , headerContent = (<F8Header title={(model + ' ' + submodel).toUpperCase()} foreground="dark" style={General.headerStyle} leftItem={leftItem}/>)
      let {
            cylinders, compressor, configuration,
            transmissionSpeed, transmission, drivenWheels, size,
          } = specs
        , graphKeys = ['horsepower', 'torque']

      const dataArray = graphKeys.map ((key)=>{return {name: key, value: specs[key]}})

      let tuningcomponent = (
        specsInfo.tuning && specsInfo.tuning.length )?(
          <View style={DetailStyles.descriptionContainer}>
              <Heading3 style={Titles.buildSectionTitle}>{"BRANDS BY CATEGORY"}</Heading3>
              <Manufacturers data={tuning} specId={specId}/>
              <F8Button
                style={{alignSelf: 'center', marginTop: 16}}
                onPress={()=>{Actions.PartFilter({filterId: specId, title: model + ' ' + submodel})} }
                type="tertiary" caption={`Search and Compare`}
                icon={require ('../common/img/tuning.png')}
              />
            </View>
        ): (<View/>)

        , postsContent = posts?(
          <View style={[DetailStyles.descriptionContainer]}>
          <Heading3 style={Titles.buildSectionTitle}>{"BUILDS"}</Heading3>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
            {posts.map ((post, idx)=>(<PostCard key={`pc-${idx}`} data={post}/>))}
          </ScrollView>
          <F8Button
            style={{alignSelf: 'center', marginTop: 16}}
            onPress={()=>{Actions.BuildsBySpecId({specId})}}
            type="tertiary" caption={`All Builds`}
            icon={require ('../common/img/comment.png')}
          />
          </View>

        ):(<View/>)

        , descContent = (
          <View style={DetailStyles.descriptionContainer}>
          <Heading3 style={Titles.buildSectionTitle}>{"SPECS"}</Heading3>
          <Heading3 style={Specs.subtitle}>{size.toFixed(1) + ` L ${configuration}-${cylinders} ${compressor}`.toUpperCase()}</Heading3>
          <Heading3 style={Specs.subtitle}>{`${transmissionSpeed} speed ${transmission}`.toUpperCase()}</Heading3>
          <Heading3 style={Specs.subtitle}>{`${drivenWheels}`.toUpperCase()}</Heading3>
          <MetricsGraph data={[{entries:dataArray}]}/>
          </View>
        )

        return (
          <View style={{flex: 1}}>
          <ParallaxScrollView
            contentBackgroundColor="white"
            backgroundSpeed={1}
            parallaxHeaderHeight={300}
            renderFixedHeader={() => headerContent}
            stickyHeaderHeight={64}
            renderForeground={()=>{
              let string = (make + ' ' + model + ' ' + submodel).toUpperCase()
              return (<Text style={DetailStyles.primaryTitle}>{string}</Text>)
            }}
            renderBackground={() => <WebView source={{uri: "https://storage.googleapis.com/vrview/index.html?image=https://s3.amazonaws.com/vr-web/images/IMG_3656.JPG&is_stereo=false"}} style={DetailStyles.VRImageHolder}/>}
            >
            <View style={{flex: 1}}>
            {descContent}
            {postsContent}
            {tuningcomponent}
            </View>
          </ParallaxScrollView>
          </View>
        );
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (TuningBySpec)
