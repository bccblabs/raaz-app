'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {resetPostFilters} from '../reducers/posts/postActions'
import {SliderStyles, Styles} from '../styles'
import Tag from '../filters/Tag'

const mapStateToProps = (state) => {
  return {
    selectedTags: state.posts.tags,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetFilters: ()=> {
      dispatch (resetPostFilters())
    }
  }
}

class TagsHeader extends Component {
  constructor (props) {
    super (props)
    this.state = {selectedTags: props.selectedTags}
  }

  componentWillReceiveProps (nextProps) {
    this.setState ({selectedTags: nextProps.selectedTags})
  }
  render () {
    let {tags, tagAction, color} = this.props
    return (
      <View style={[styles.container, {backgroundColor: color}]}>
        <TouchableOpacity
          accessibilityLabel="Clear filter"
          accessibilityTraits="button"
          style={styles.clear}
          onPress={Actions.Makes}>
          <Text style={styles.text}>{("Tuning By Car").toUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Clear filter"
          accessibilityTraits="button"
          style={styles.clear}
          onPress={Actions.PostFilters}>
          <Text style={styles.text}>{("Filter Builds").toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (TagsHeader)

var styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    opacity: 0.6,
    justifyContent: 'center'
  },
  text: {
    fontSize: 10,
    color: 'white',
    letterSpacing: 1,
    alignSelf: 'center',
    textDecorationLine: 'underline'
  },
  clear: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  filters: {
    color: 'rgba(255, 255, 255, 0.65)',
  }
});
