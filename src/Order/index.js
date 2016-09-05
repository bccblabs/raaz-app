'use strict'
import React, {Component, ScrollView, StyleSheet, View} from 'react-native'

import {Actions} from 'react-native-router-flux'

import {Heading1, Heading2, Text} from '../common/F8Text.js'
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'

import ParallaxScrollView from 'react-native-parallax-scroll-view'
import {FilterStyles, ParallaxScrollStyles, Styles} from '../styles'

export default class Order extends Component {
  render () {
      let {
          sku,
          title,
          description,
          url,
          items,
          price,
          makeModelString,
          dealerName,
          dealerPhone,
          dealerEmail,
          media,
        } = this.props

    const optionsData = media.map ((imageItem, idx)=>{
              return {imageUrl: {uri: imageItem.link}, imageType: 'type'}
            }),
          leftItem = {
             title: 'Cancel',
             onPress: ()=>{Actions.pop()}
          },
          rightItem = {
            title: 'Save',
          },
          captionText = price?'Order for $' + price:"Inquire"

      return (
        <View style={{backgroundColor: 'transparent', flex: 1}}>
        <ParallaxScrollView
          ref="ParallaxView"
          backgroundColor="transparent"
          headerBackgroundColor="transparent"
          stickyHeaderHeight={F8Header.height}
          parallaxHeaderHeight={ ParallaxScrollStyles.CARD_HEIGHT + 80 }
          backgroundSpeed={10}
          renderBackground={() => (
            <View key="background" style={{backgroundColor:'transparent'}}/>
          )}
          renderForeground={()=> {
            return (
              <View style={{flex: 1, backgroundColor: 'transparent', paddingTop: F8Header.height}}>
              </View>
            )
          }}
          renderFixedHeader={()=>{
            return (
              <F8Header
                foreground="dark"
                style={[FilterStyles.headerStyle, {backgroundColor: 'white'}]}
                title="Details"
                leftItem={leftItem}
                rightItem={rightItem}/>

            )
          }}>
            <ScrollView style={{height: window.height}}>
              <View style={{flex: 1}}>
                <View style={{padding: 32}}>
                    <Heading1>{title}</Heading1>

                    {
                      sku && (
                        <View style={{flexDirection: 'row', paddingVertical: 16}}>
                          <Text style={{fontWeight: 'bold', paddingRight: 8}}>{"SKU:"}</Text>
                          <Text>{sku}</Text>
                        </View>
                      )
                    }
                    <View>
                    {
                      items.map ((item, idx)=> (
                        <View style={{paddingVertical: 3}} key={idx}>
                          <Text>
                            {item}
                          </Text>
                        </View>
                      ))
                    }
                    </View>

                  </View>
              </View>
            </ScrollView>
          </ParallaxScrollView>
          <F8Button
            type="secondary"
            caption={captionText}
            style={Styles.contactDealerButton}/>
        </View>
      )
    }
}
