'use strict'

import React, {Component, Image, ScrollView, Text, View} from 'react-native'
import RequestUtils from '../requests'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import {createSelector} from 'reselect'

import ViewPager from 'react-native-viewpager'

import {Heading1, Heading2, Heading3} from '../common/F8Text'
import {syncProduct} from '../reducers/history/historyActions'
import {Styles, TuningBySpecStyles, FilterStyles} from '../styles'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import FullScreenLoadingView from '../components/FullScreenLoadingView'

class PartDetails extends Component {
  constructor (props) {
    super (props)
    let viewPagerDataSource = new ViewPager.DataSource({
          pageHasChanged: (p1, p2) => p1 !== p2,
        })
      , mediaDataSource = viewPagerDataSource.cloneWithPages (this.props.data.media)
      , {data} = props

    this.state = {
      name: data.name,
      description: data.description,
      mediaDataSource: mediaDataSource,
      partId: data.partId,
      url: data.url,
      hasError: false,
      isLoading: true
    }

    this.fetchPartDetails = this.fetchPartDetails.bind (this)
  }

  async fetchPartDetails (partId) {
    try {
      let data = await RequestUtils.fetchPartDetails (partId)
      console.log ('partsData', data)
      this.setState ({hasError: false, isLoading: false, ...data})
    } catch (err) {
      this.setState ({hasError: true, isLoading: false})
    }
  }

  componentWillMount () {
    this.fetchPartDetails (this.props.data.partId)
  }

  render() {
    let {
      hasError, isLoading,

      name,
      partId,
      media,
      description,

      manufacturer,
      listings,
      posts,
      comments,

    } = this.state

    const leftItem = {
      title: 'Back',
      onPress: ()=> {Actions.pop()}
    },
    rightItem = {
      title: 'Save',
      onPress: ()=> {this.props.dispatch (syncProduct(partId))}
    }
    let content = isLoading?(<FullScreenLoadingView/>):(
      <View style={{flex: 1}}>
      <F8Header
        foreground="dark"
        leftItem={leftItem}
        rightItem={rightItem}
        style={FilterStyles.headerStyle}/>
        <ScrollView>
          <Heading1 style={{padding: 16, color: 'black'}}>{name}</Heading1>
          <ViewPager
            renderPage={(media)=>{return (<Image source={{uri:media}} style={Styles.largeImageStyle}/>)}}
            dataSource={this.state.mediaDataSource}
          />
          <View style={{paddingBottom: 49}}>
          {description && description.map ((item, idx)=> (<Heading3 style={TuningBySpecStyles.subtitle} key={`partdesc-${idx}`}>{item}</Heading3>))}
          {manufacturer && manufacturer.logo && <Image source={{uri: manufacturer.logo}} resizeMode="contain" style={{height: 50, margin: 32}}/>}
          </View>
        </ScrollView>
        <F8Button
          type="secondary"
          caption="Inquire"
          onPress={()=>{Actions.Order ({...this.props.data})}}
          style={Styles.contactDealerButton}/>
      </View>
    )
    return content
  }
}

export default connect () (PartDetails)
