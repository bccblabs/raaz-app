'use strict'

import React, {
  Component,
  ScrollView,
  TextInput,
  TouchableHighlight,
  View,
  Platform,
  Image,
} from 'react-native'

var {Icon} = require ('react-native-vector-icons/FontAwesome')
import Video from 'react-native-video'
var ImagePickerManager = require('NativeModules').ImagePickerManager
var FloatLabelTextInput = require('react-native-floating-label-text-input')

import F8Header from '../common/F8Header'
import FilterCard from '../filters/FilterCard'

import MainButton from '../common/MainButton'
import { Text, Paragraph } from '../common/F8Text'
import { ButtonStyles, NewPostStyles, SliderStyles, Styles, FilterStyles } from '../styles'
import { Actions } from 'react-native-router-flux'
import {ImageOptions, VideoOptions} from '../constants/pickerOptions'


export default class NewPost extends Component {
  constructor (props) {
    super (props)
    this.pickImage = this.pickImage.bind (this)
    this.renderImagesContainer = this.renderImagesContainer.bind (this)
    this.renderVideosContainer = this.renderVideosContainer.bind (this)
    this.state = {
      images: [],
      videos: [],
      postType: 'log'
    }
  }

  pickImage (type) {
    ImagePickerManager.launchImageLibrary(ImageOptions, (response) => {
      if (response.didCancel) {
        return
      }
        let images = this.state.images
        const source = Platform.OS === 'ios'
                      ? {type: type, uri: response.uri.replace('file://', ''), isStatic: true, width: response.width, height: response.height}
                      : {type: type, uri: response.uri, isStatic: true, width: response.width, height: response.height}
        images.push (source)
        this.setState({images})
    });
  }

  pickVideo (type) {
    ImagePickerManager.launchImageLibrary(VideoOptions, (response) => {
      if (response.didCancel) {
        return
      }
        const source = Platform.OS === 'ios'
                      ? {type: type, uri: response.uri.replace('file://', ''), isStatic: true, width: response.width, height: response.height}
                      : {type: type, uri: response.uri, isStatic: true, width: response.width, height: response.height}
        let videos = this.state.videos
        videos.push (source)
        this.setState ({videos})
    });
  }


  renderGenericInput() {
    return (
      <View>
        <TextInput
          placeholder="Wassup with your ride..."
          placeholderColor="gray"
          multiline={true}
          maxLength={140}
          style={NewPostStyles.largeBlockInput}/>
          <Text style={NewPostStyles.divTitleStyle}>Car</Text>
          <TextInput
            placeholder="2016 Ford Mustang "
            placeholderColor="gray"
            multiline={true}
            maxLength={140}
            style={NewPostStyles.singleLineBlockInput}/>

      </View>
    )

  }
  renderEditLog() {
    return (
      <View style={{paddingTop: 20, paddingBottom: 20}}>
      {this.renderGenericInput()}
      </View>
    )
  }

  renderEditListing() {
    return (
      <View style={{paddingTop: 20, paddingBottom: 20}}>
      {this.renderGenericInput()}
      <FloatLabelTextInput
        placeHolder={"Asking Price ($)"}
        value={"70,000"}
        />
      <FloatLabelTextInput
        placeHolder={"Mileage"}
        value={"0"}
        />
        <FloatLabelTextInput
          placeHolder={"VIN"}
          value={"Your VIN here..."}
        />
     </View>
    )
  }

  renderVideosContainer () {
    return this.state.videos.length>0?
    ( <View>
      <Text style={NewPostStyles.divTitleStyle}>Videos</Text>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {
          this.state.videos.map ((img, idx)=>{
            return (
              <View key={idx} style={{alignItems: 'center', height: 300, width: 300}}>
                <Video
                   source={{uri: img.uri}}/>
                <MainButton
                  onPress={()=>{
                    let images = this.state.videos.splice (idx, 1)
                    this.setState ({videos: this.state.videos})
                    }}
                  type='secondary'
                  caption="Remove"/>
                </View>
            )
          })
        }
      </ScrollView>
      </View>
    )
    :(<View/>)
  }
  renderImagesContainer () {
    return this.state.images.length>0?
    ( <View>
      <Text style={NewPostStyles.divTitleStyle}>Photos</Text>
      <ScrollView
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
        {
          this.state.images.map ((img, idx)=>{
            return (
              <View key={idx} style={{alignItems: 'center'}}>
              <Image style={{width: 100, height: 100}} source={{uri: img.uri}}/>
              <MainButton
                onPress={()=>{
                  let images = this.state.images.splice (idx, 1)
                  this.setState ({images: this.state.images})
                  }}
                type='secondary'
                caption="Remove"/>
              </View>
            )
          })
        }
      </ScrollView>
      </View>
    )
    :(<View/>)
  }

  render () {
    const leftItem = {
            title: 'cancel',
            onPress: ()=>Actions.pop()
          },
          rightItem = {
            title: 'preview',
            onPress: ()=>Actions.SavePublishPost()
          },
          accessibilityTraits = ['button']


    return (
      <View style={{flex: 1}}>
        <F8Header
          foreground="dark"
          leftItem={leftItem}
          rightItem={rightItem}
          title="New Log"
          style={FilterStyles.headerStyle}/>
          <ScrollView>
          {this.renderImagesContainer()}
          {this.renderVideosContainer()}
          {this.state.postType==='log'?this.renderEditLog():this.renderEditListing()}
        <View style={NewPostStyles.bottomBar}>
          <Text style={NewPostStyles.divTitleStyle}>Add Media</Text>
          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{padding: 4}}>
              <MainButton
                type='bordered'
                style={NewPostStyles.addMediaButtonStyle}
                caption="Panorama"
                onPress={()=>{this.pickVideo('panorama')}}/>
            </View>
            <View style={{padding: 4}}>
              <MainButton
                type='bordered'
                style={NewPostStyles.addMediaButtonStyle}
                caption="Photos"
                onPress={()=>{this.pickImage('normal')}}/>
            </View>
            <View style={{padding: 4}}>
              <MainButton
                type='bordered'
                style={NewPostStyles.addMediaButtonStyle}
                caption="Videos"
                onPress={()=>{pickVideo('normal')}}/>
            </View>

          </ScrollView>
          </View>
          </ScrollView>
        </View>
    )
  }
}
