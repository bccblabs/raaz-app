'use strict'

'use strict'
import React, {
  Component,
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

import FilterCard from './FilterCard'

import {Paragraph} from '../common/F8Text'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {
  buildsUrl,
  partsUrl,
  toggleListValue,
  toggleRangeValue,
  resetTuningFilters,
  fetchParts,
  fetchBuilds
} from '../reducers/builds/filterActions'

import isArray from 'lodash/isArray'
import {SliderStyles, FilterStyles, Styles} from '../styles'
import F8Header from '../common/F8Header'
import PureListView from '../common/PureListView'
export const TuningFilterOptions = [
  {
      name: 'Engine Tuning',
      options: [
        {
          title: 'Turbo',
          value: 'turbo',
          filterAction: toggleListValue ('tuning', 'turbo'),
          category: 'tuning',
          imageUrl: require ('../images/turboCharger.png')
        },
        {
          title: 'Supercharger',
          filterAction: toggleListValue ('tuning', 'supercharge'),
          category: 'tuning',
          value: 'supercharge',
          imageUrl: require ('../images/supercharger.png')
        },
        {
          title: 'Intake',
          filterAction: toggleListValue ('tuning', 'intake'),
          category: 'tuning',
          value: 'intake',
          imageUrl: require ('../images/intake.png')
        },
        {
          title: 'Intercooler',
          filterAction: toggleListValue ('tuning', 'intercooler'),
          category: 'tuning',
          value: 'intercooler',
          imageUrl: require ('../images/intercooler.png')
        },
        {
          title: 'ECU',
          filterAction: toggleListValue ('tuning', 'ecu'),
          category: 'tuning',
          value: 'ecu',
          imageUrl: require ('../images/ecu.png')
        },
      ]
  },
  {
    name: "Exhaust Tuning",
    options: [
      {title: 'Titanium',
      category: 'tuning',
      value: 'titanium',
      filterAction: toggleListValue ('tuning', 'exhaust titanium'),
      imageUrl: require ('../images/titanium.png')},
      {title: 'Pipes',
      category: 'tuning',
      value: 'pipes',
      filterAction: toggleListValue ('tuning', 'pipe'),
      imageUrl: require ('../images/downpipe.png')},
      {title: 'Tips',
      value: 'tips',
      category: 'tuning',
      filterAction: toggleListValue ('tuning', 'tip'),
      imageUrl: require ('../images/tip.png')},

    ]
  },
  {
    name: 'Drive Tuning',
    options: [
      {
        title: 'Brakes',
        value: 'brakes',
        category: 'tuning',
        filterAction: toggleListValue ('tuning', 'brakes'),
        imageUrl: require ('../images/brakes.png')
      },
      {title:'Shocks',
      value: 'shocks',
      category: 'tuning',
      filterAction: toggleListValue ('tuning', 'shocks'),
      imageUrl: require('../images/shocks.png')},
      {title:'Air Ride',
      category: 'tuning',
      value: 'Air Ride',
      filterAction: toggleListValue ('tuning', 'adjustable suspension'),
      imageUrl: require('../images/adjustableSuspension.png')},
      {title:'Differential',
      category: 'tuning',
      value: 'differential',
      filterAction: toggleListValue ('tuning', 'differential'),
      imageUrl: require('../images/differential.png')},
      {title:'Transmission',
      category: 'tuning',
      value: 'transmission',
      filterAction: toggleListValue ('tuning', 'transmission'),
      imageUrl: require('../images/transmission.png')},
    ]
  },
  {
    name: 'Exterior Tuning',
    options: [
      {title: 'Rims',
      category: 'tuning',
      value: 'trims',
      filterAction: toggleListValue ('tuning', 'rims'),
      imageUrl: require ('../images/rims.png')},
      {title: 'Wing / Spoiler',
      category: 'tuning',
      value: 'wing',
      filterAction: toggleListValue ('tuning', 'wing'),
      imageUrl: require ('../images/wing.png')},
      {title: 'Diffuser / Splitter',
      category: 'tuning',
      value: 'diffuser splitter',
      filterAction: toggleListValue ('tuning', 'diffuser splitter'),
      imageUrl: require ('../images/splitter.png')},
      {title: 'Body Kit',
      category: 'tuning',
      value: 'body kit',
      filterAction: toggleListValue ('tuning', 'body kit'),
      imageUrl: require ('../images/bodykit.png')},
    ]
  },
  {
    name: 'Interior Tuning',
    options: [
      {title: 'Racing Seats',
      category: 'tuning',
      value: 'race seats',
      filterAction: toggleListValue ('tuning', 'race seats'),
      imageUrl: require ('../images/racingSeats.png')},
      {title: 'Rollcage',
      category: 'tuning',
      value: 'roll cage',
      filterAction: toggleListValue ('tuning', 'roll cage'),
      imageUrl: require ('../images/rollCage.png')},
      {title: 'Gauges',
      category: 'tuning',
      value: 'gauges',
      filterAction: toggleListValue ('tuning', 'gauges'),
      imageUrl: require ('../images/gauges.png')},
    ]
  }
]

const tuningFilterSelector= (state) => {return state.tuning.toJS()}

const getTuningFilters = createSelector (
  [tuningFilterSelector],
  (tuningFilters) => {
    return tuningFilters
  }
)

const mapStateToProps = (state) => {
  return {
    tuningFilters: getTuningFilters(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBuilds: ()=>dispatch (fetchBuilds(buildsUrl)),
    fetchParts: ()=>dispatch (fetchParts (partsUrl)),
    resetTuningFilters: ()=>{
      dispatch (resetTuningFilters())
      dispatch (fetchBuilds(buildsUrl))
      dispatch (fetchParts (partsUrl))
    }
  }
}

class TuningCategories extends Component {
  _innerRef: ?PureListView;
  constructor (props) {
    super (props)
    this._innerRef = null;
    this.renderRow = this.renderRow.bind (this)
    this.storeInnerRef = this.storeInnerRef.bind (this)
    this.calcFilterState = this.calcFilterState.bind (this)
  }

  calcFilterState (category, value) {
    const subFilterState = this.props.tuningFilters[category]
    if (isArray (subFilterState))
      return (subFilterState.indexOf (value) > -1)
    else {
      return value === subFilterState.min
    }
  }
  shouldComponentUpdate (nextProps, props) {
    return true
  }
  renderRow (filters, rowId) {
    return (
        <View style={{backgroundColor: 'white'}}>
        <Paragraph style={SliderStyles.sliderTitle}>
        {filters.name}
        </Paragraph>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={SliderStyles.horizontalScrollContainer}
          contentContainerStyle={Styles.scrollContainer}>
          {
            filters.options.map ((filterChoice, idx)=> {
              let isFilterSelected = this.calcFilterState (filterChoice.category, filterChoice.value)
              return ( <FilterCard touchEnabled={true} {...filterChoice} selected={isFilterSelected} key={idx} action={filterChoice.filterAction}/>)
            })
          }
        </ScrollView>
        </View>
    )
  }
  render() {
    const leftItem = {
            title: 'Done',
            onPress: ()=>{Actions.pop()}
          },
          rightItem = {
            title: 'Apply',
            onPress: ()=>{Actions.pop(); this.props.fetchParts(); this.props.fetchBuilds()}
          }
    if (this.props.showHeader === false) {
      return (
        <PureListView
          style={{marginBottom: 32}}
          ref={this.storeInnerRef}
          renderRow={this.renderRow}
          data={TuningFilterOptions}
          {...this.props}
          />
      )
    } else {
      return (
        <View style={{flex: 1}}>
        <F8Header
          foreground="dark"
          style={FilterStyles.headerStyle}
          title="Tuning"
          leftItem={leftItem}
          rightItem={rightItem}/>
        <PureListView
          style={{marginBottom: 32, backgroundColor: 'white'}}
          ref={this.storeInnerRef}
          renderRow={this.renderRow}
          data={TuningFilterOptions}
          {...this.props}
          />
        </View>
      )
    }
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }


  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }


}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 75,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 35,
  },
});

export default connect (mapStateToProps, mapDispatchToProps) (TuningCategories)
