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
import Carmera from '../components/Carmera'
import StockCars from '../filters/StockCars'
import {fetchDealsFromApi, toggleCarTag, fetchCategoriesFromApi} from '../reducers/stockCar/filterActions'
import {loadSavedSpecsFromApi} from '../reducers/history/historyActions'
import Deals from '../tuning/Deals'
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import TagsHeader from '../common/TagsHeader'
import {Heading3, Paragraph} from '../common/F8Text'
import {SliderStyles, Styles} from '../styles'



const categoriesEntitiesSelector = (state) => (state.entities.categories)
const categoriesPaginationSelector = (state) => (state.pagination.categoriesPagination)

const getCategoriesSelector = createSelector (
  [categoriesEntitiesSelector, categoriesPaginationSelector],
  (categoryEntities, categoryPagination) => {
    let ids = []
    if (categoryPagination['home']) {
      ids = categoryPagination['home'].ids
    }
    return ids.map (id=>categoryEntities[id])
  }
)

const mapStateToProps = (state) => {
    return {
      selectedMake: state.stockCar.selectedMake,
      selectedModel: state.stockCar.selectedModel,
      selectedTrim: state.stockCar.selectedTrim,
      selectedYears: state.stockCar.selectedYears,

      deals: state.entities.deals,
      savedSpecs: state.entities.savedSpecs,

      categories: getCategoriesSelector (state),
      categoriesPagination: state.pagination.categoriesPagination,
      selectedTags: state.stockCar.tags
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: ()=> {
      dispatch (fetchCategoriesFromApi ('home'))
    },
    fetchDeals: ()=> {
      dispatch (fetchDealsFromApi())
    },
    loadSavedSpecs: () => {
      dispatch (loadSavedSpecsFromApi())
    }
  }
}


class Tuning extends Component {
  constructor (props) {
    super (props)
    this.setState ({
      selectedTags: props.selectedTags,
      categories: props.categories,
      categoriesPagination: props.categoriesPagination,
    })
  }

  componentWillMount () {
    this.setState ({
      selectedTags: this.props.selectedTags,
      categories: this.props.categories,
      categoriesPagination: this.props.categoriesPagination,
    })
    this.props.fetchCategories()
  }

  componentWillReceiveProps (nextProps) {
    let {categories, categoryPagination, selectedTags} = nextProps
    this.setState ({categories, categoryPagination, selectedTags})
  }

  render () {
    const leftItem = {title: 'Saved', onPress: ()=>{Actions.SavedItems()}},
          rightItem = {title: 'Recognize!', onPress: ()=>{Actons.Orders()}},
          selectedTags = this.state.selectedTags
    let buttonContent = selectedTags.size ? (
      <F8Button
      type="secondary"
      caption="Fetch Cars!"
      style={Styles.contactDealerButton}/>): (<View/>)
    return (
      <View style={{flex: 1}}>
      <F8Header title="Cars" foreground='dark' leftItem={leftItem} rightItem={rightItem}/>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            accessibilityLabel="Clear filter"
            accessibilityTraits="button"
            style={styles.clear}
            onPress={Actions.Makes}>
            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
            <Image source={require('../common/img/filter.png')} />
            <Heading3 style={styles.text}>{"Search By Car Specs"}</Heading3>
            </View>
          </TouchableOpacity>
        </View>
        <Paragraph style={{alignSelf: 'flex-end', paddingRight: 8, fontFamily: 'FontAwesome'}}>Deals</Paragraph>
        <Deals />
        <Paragraph style={{fontWeight: 'bold', alignSelf: 'flex-end', paddingRight: 8, fontFamily: 'FontAwesome'}}>Categories</Paragraph>
        <StockCars data={this.state.categories} onPress={toggleCarTag} selectedTags={this.state.selectedTags}/>
        </ScrollView>
        {buttonContent}
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Tuning)

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: 'black',
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 8
  },
  clear: {
    paddingRight: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

})
