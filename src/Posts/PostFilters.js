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

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import TagFilters from '../filters/TagFilters'
import {togglePostTag, fetchCategoriesFromApi} from '../reducers/posts/postActions'

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
      categories: getCategoriesSelector (state),
      categoriesPagination: state.pagination.categoriesPagination,
      selectedTags: state.posts.tags
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: ()=> {
      dispatch (fetchCategoriesFromApi ('home'))
    },

  }
}

class PostFilters extends Component {
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
    const leftItem = {title: 'Back', onPress: ()=>{Actions.pop()}}
    let {selectedTags} = this.state
    let buttonContent = selectedTags.size ? (
      <F8Button
        type="secondary"
        caption="Find Me Cars!"
        onPress={Actions.pop}
        style={[Styles.contactDealerButton]}/>
      ):(
      <F8Button
        type="secondary"
        caption="Please Select From Above"
        onPress={Actions.pop}
        style={[Styles.contactDealerButton,{backgroundColor: 'gray'}]}/>
      )

      return (
        <View style={{flex: 1}}>
        <F8Header title="Builds" foreground='dark' leftItem={leftItem} />
        <ScrollView>
          <View style={{flex: 1, marginBottom: 50}}>
          <TagFilters data={this.state.categories} onPress={togglePostTag} selectedTags={selectedTags}/>
          {buttonContent}
          </View>
          </ScrollView>
        </View>
      )
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostFilters)

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: 'orange',
  },
  text: {
    flex: 1,
    fontSize: 10,
    color: 'white',
    paddingHorizontal: 8,
    letterSpacing: 1,

  },
  clear: {
    paddingRight: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

})
