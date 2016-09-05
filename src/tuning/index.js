'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import BuildsList from '../tuning/BuildsList'
import Carmera from '../components/Carmera'
import TagFilters from '../filters/TagFilters'
import TagsHeader from '../common/TagsHeader'
import {toggleCarTag, fetchCategoriesFromApi} from '../reducers/stockCar/filterActions'
import {togglePostTag} from '../reducers/posts/postActions'

import {loadSavedSpecsFromApi} from '../reducers/history/historyActions'
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
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

      savedSpecs: state.entities.savedSpecs,

      categories: getCategoriesSelector (state),
      categoriesPagination: state.pagination.categoriesPagination,
      selectedTags: state.stockCar.tags
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSavedSpecs: () => {
      dispatch (loadSavedSpecsFromApi())
    }
  }
}


class Tuning extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedTags: props.selectedTags,
      categories: props.categories,
      categoriesPagination: props.categoriesPagination,
    }
  }

  componentWillReceiveProps (nextProps) {
    let {categories, categoryPagination, selectedTags} = nextProps
    this.setState ({categories, categoryPagination, selectedTags})
  }

  render () {
    const leftItem = {title: 'Saved', onPress: ()=>{Actions.SavedItems()}},
          rightItem = {title: 'Orders', onPress: ()=>{Actons.Orders()}},
          selectedTags = this.state.selectedTags

    let {categories} = this.state
      , tags = []

    if (categories && categories.length) {
      let topLvl = categories.find ((val)=>{return val.name === 'popular' || val.name === 'origin'})
      if (topLvl) {
        tags = topLvl.options.map ((elem)=>elem.name)
      }
    }

    return (
      <View style={{flex: 1, backgroundColor:'transparent'}}>
      <F8Header title="Tuning" foreground='dark' leftItem={leftItem} rightItem={rightItem}/>
      <TagsHeader onPress={Actions.PostFilters} color="black" tagAction={togglePostTag} tags={tags}/>
      <Carmera/>
      <BuildsList/>
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Tuning)

const styles = StyleSheet.create ({
  header: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: 'black',
    opacity: 0.6,
  },
  text: {
    fontSize: 10,
    color: 'white',
    letterSpacing: 1,
    alignSelf: 'center',
  },
  clear: {
    paddingRight: 16,
    justifyContent: 'center',
    flex: 1,
  },

})
