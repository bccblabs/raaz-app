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

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import TagFilters from '../filters/TagFilters'
import {fetchCategoriesFromApi} from '../reducers/tuning/filterActions'
import {Heading3, Paragraph} from '../common/F8Text'
import {General} from '../styles'

import {getCategoriesSelector, categoriesPaginationSelector, selectedTagsSelector} from '../selectors'

const mapStateToProps = (state, props) => {
    return {
      categories: getCategoriesSelector (state, props),
      categoriesPagination: categoriesPaginationSelector (state, props),
      selectedTags: selectedTagsSelector (state, props),
      key: props.filterId
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (key)=> {
      dispatch (fetchCategoriesFromApi (key))
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

  componentDidMount () {
    let {fetchCategories, filterId} = this.props
    fetchCategories (filterId)
  }

  componentWillReceiveProps (nextProps) {
    let {categories, categoryPagination, selectedTags} = nextProps
    this.setState ({categories, categoryPagination, selectedTags})
  }

  render () {
    let {selectedTags} = this.state
      , {onPress, toggleAction} = this.props
    let buttonContent = selectedTags.size ? (
      <F8Button
        type="secondary"
        caption="Get Sum"
        onPress={onPress}
        style={General.bottomButtonStyle}/>
      ):(
      <F8Button
        type="secondary"
        caption="Please Select From Above"
        style={[General.bottomButtonStyle,{backgroundColor: 'gray'}]}/>
      )

      return (
        <View style={{flex: 1}}>
        <ScrollView>
          <TagFilters data={this.state.categories} onPress={toggleAction} selectedTags={selectedTags}/>
          </ScrollView>
          {buttonContent}
        </View>
      )
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostFilters)
