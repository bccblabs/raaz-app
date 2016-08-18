'use strict'

import React, {Component, Image, ScrollView, Text, View} from 'react-native'
import {Heading1, Heading2} from '../common/F8Text'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import {createSelector} from 'reselect'
import {saveToHistory} from '../reducers/history/historyActions'
import {Styles, ButtonStyles, FilterStyles} from '../styles'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'

var ViewPager = require('react-native-viewpager');

class BuildDetails extends Component {
  constructor (props) {
    super (props)
    let viewPagerDataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    }), mediaDataSource = viewPagerDataSource.cloneWithPages (this.props.data.media)
    this.state = {
      mediaDataSource: mediaDataSource
    }
  }

  render() {
    let {
      title,
      price,
      makeModelString,
      items,
      media,
      description,
      sku,
      // use sku from mongoId if not found
      productId,
      dealerName,
      dealerPhone,
      dealerEmail,

      dealerCity,
      dealerState,
      dealerAddress,

    } = this.props.data

    const leftItem = {
      title: 'Close',
      onPress: ()=> {Actions.pop()}
    },
    rightItem = {
      title: 'Save',
      onPress: ()=> {this.props.dispatch (saveToHistory(this.props.data))}
    }


    return (
      <View style={{flex: 1}}>
      <F8Header
        title="Details"
        leftItem={leftItem}
        rightItem={rightItem}
        style={FilterStyles.headerStyle}/>

        <View style={{alignItems:'center', justifyContent: 'center'}}>
          <Heading1 style={Styles.largeTitleStyle}>
            {title?title:makeModelString}
          </Heading1>
        </View>

        <ScrollView style={Styles.topLevelScrollStyle} containerStyle={Styles.topScrollContainerStyle}>
          <Heading2 style={{marginLeft: 16, marginRight: 16, marginTop: 4, fontSize: 14}}>
            {title?makeModelString:""}
          </Heading2>
          <ViewPager
            renderPage={(media)=>{
              return (<Image source={{uri:media.link}} style={Styles.largeImageStyle}/>)
            }}
            dataSource={this.state.mediaDataSource}/>

          <Heading2 style={Styles.descriptionText}>
            {description}
          </Heading2>

          <Heading2 style={{margin: 8, fontSize: 15}}>{"Details"}</Heading2>

          <ScrollView
            style={Styles.ItemsListStyle}>
            <View style={{paddingBottom: 49}}>
            {
              items.map ((item, idx)=> (
                <View style={Styles.ItemStyle} key={idx}>
                  <Text>
                    {item}
                  </Text>
                </View>
              ))
            }
            </View>
          </ScrollView>

        </ScrollView>

        <F8Button
          type="secondary"
          caption="Inquire"
          onPress={()=>{Actions.Order ({...this.props.data})}}
          style={Styles.contactDealerButton}/>
      </View>
    )
  }
}

export default connect () (BuildDetails)
