'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import ParallaxScrollView from 'react-native-parallax-scroll-view';

// Inside of a component's render() method:
import {fetchCarDetails, toggleTuningTags, clearTuningTags} from '../reducers/tuning/filterActions'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import {Heading1, Heading2, Heading3, EmptyHeading, Paragraph} from '../common/F8Text'

import FullScreenLoadingView from '../components/FullScreenLoadingView'
import MetricsGraph from '../components/MetricsGraph'
import TagFilters from '../filters/TagFilters'
import PostsList from '../Posts/PostListView'
import {VRImage} from '../cardboard'

import {Styles ,TuningBySpecStyles} from '../styles'
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
    tuningTags: state.tuning.filterTags,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecsDetails: (specId)=>{
      dispatch (fetchCarDetails (specId))
    },
    clearTuningTags: () => {
      dispatch (clearTuningTags())
    }
  }
}

class TuningBySpec extends Component {

  constructor (props) {
    super (props)
    this.state = {
      selectedTags: props.tuningTags,
      specsDetails: props.specsDetails,
      specsPagination: props.specsPagination,
    }
  }

  componentWillMount () {
    let {specId, fetchSpecsDetails} = this.props
    fetchSpecsDetails(specId)
    clearTuningTags()
  }

  componentWillReceiveProps (nextProps) {
    let {tuningTags, specsPagination, specsDetails} = nextProps
      , specsInfo = this.state.specsDetails[0]
    console.log (tuningTags)
    this.setState ({
      selectedTags: tuningTags,
      specsDetails,
      specsPagination,
    })
  }


  render () {
    let {selectedTags, specsDetails, specsPagination, availableTags} = this.state
      , specsInfo = this.state.specsDetails[0]
    if (specsPagination.isFetching || !specsInfo) return (<FullScreenLoadingView/>)
    else {
      const leftItem = {title: 'Back', onPress: ()=> {Actions.pop ()}}
          , spec = specsInfo.specs
          , headerComponent = (<F8Header foreground="light" leftItem={leftItem}/>)
          , {make, model, submodel} = specsInfo

      let {
            cylinders, compressor, configuration,
            transmissionSpeed, transmission, drivenWheels, size,
          } = spec
        , graphKeys = ['horsepower', 'torque']

      const dataArray = graphKeys.map ((key)=>{return {name: key, value: spec[key]}})

      let tuningcomponent = (specsInfo && specsInfo.tuning.data.length )?(
        <View>
          <Heading3 style={TuningBySpecStyles.subtitle}>{"Search Tuning By Categories"}</Heading3>
          <TagFilters data={specsInfo && specsInfo.tuning.data || []} onPress={toggleTuningTags} selectedTags={this.state.selectedTags}/>
          {selectedTags.size?(<F8Button onPress={()=>{Actions.TuningPager({tuningTags: selectedTags})}} type="secondary" caption="Search Tuning!" style={Styles.contactDealerButton}/>):
                                (<F8Button onPress={()=>{}} type="secondary" caption="Please Select From Above" style={[Styles.contactDealerButton, {backgroundColor: 'gray'}]}/>)
          }
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
            <Heading3 style={TuningBySpecStyles.subtitle}>{"Specs"}</Heading3>
            <View style={{padding: 16}}>
            <Heading3 style={TuningBySpecStyles.subtitle}>{size.toFixed(1) + ` L ${configuration}-${cylinders} ${compressor}`}</Heading3>
            <Heading3 style={TuningBySpecStyles.subtitle}>{`${transmissionSpeed} speed ${transmission}`}</Heading3>
            <Heading3 style={TuningBySpecStyles.subtitle}>{`${drivenWheels}`}</Heading3>
            <MetricsGraph data={[{entries:dataArray}]}/>
            </View>
            {tuningcomponent}
            </View>
            <Heading3 style={TuningBySpecStyles.subtitle}>{"Posts"}</Heading3>
            <PostsList/>
          </ParallaxScrollView>
        );
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (TuningBySpec)
