'use strict'
import React, {
  Component,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'

import {SliderStyles, Styles} from '../styles'
import FilterCard from '../filters/FilterCard'
export default class FilterCards extends Component {
  render () {
    let {optionsData, touchEnabled} = this.props
    console.log ('FilterCards, props=', optionsData)
    let filtersContent = touchEnabled?
      optionsData.map ((filterChoice, idx)=> {
        console.log ('touch enabled, filterChoice=', filterChoice)
        let isFilterSelected = this.calcFilterState (filterChoice.category, filterChoice.value)
        return ( <FilterCard imageStyle={SliderStyles.imageStyle} {...filterChoice} selected={isFilterSelected} key={idx} action={filterChoice.filterAction}/>)
      })
      :optionsData.map ((filterChoice, idx)=>{
        console.log ('touch disabled, filterChoice=', filterChoice)
        return ( <FilterCard imageStyle={SliderStyles.imageStyle}  {...filterChoice} selected={true} key={idx}/>)
      })
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={SliderStyles.horizontalScrollContainer}
        contentContainerStyle={Styles.scrollContainer}>
        {filtersContent}
      </ScrollView>
    )
    // if (touchEnabled) {
    //   return optionsData.map ((filterChoice, idx)=> {
    //     console.log ('touch enabled, filterChoice=', filterChoice)
    //     let isFilterSelected = this.calcFilterState (filterChoice.category, filterChoice.value)
    //     return ( <FilterCard {...filterChoice} selected={isFilterSelected} key={idx} action={filterChoice.filterAction}/>)
    //   })
    // } else {
      // return optionsData.map ((filterChoice, idx)=>{
        // console.log ('touch disabled, filterChoice=', filterChoice)
        // return ( <FilterCard {...filterChoice} selected={true} key={idx}/>)
      // })
    // }
  // }
  }
}
