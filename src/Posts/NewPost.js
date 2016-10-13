'use strict'

import React, {
  Component,
  ScrollView,
  TextInput,
  TouchableHighlight,
  View,
  Platform,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import { Actions } from 'react-native-router-flux'

import FloatLabelTextInput from 'react-native-floating-label-text-input'
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import FilterCard from '../filters/FilterCard'

import { Text, Paragraph } from '../common/F8Text'
import { NewPostStyles, General, ListingStyles, PostStyles } from '../styles'
import {ImageOptions, VideoOptions} from '../constants/pickerOptions'

import {newpostTaggedCars} from '../selectors'
import {removeFromTaggedCars} from '../reducers/newpost/newpostActions'

const dismissKeyboard = require('dismissKeyboard')

const mapStateToProps = (state) => {
  return {
    profileData: state.user.profileData,
    taggedCars: newpostTaggedCars (state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromTaggedCars: (specId) => {dispatch (removeFromTaggedCars (specId))}
  }
}

class NewPost extends Component {
  constructor (props) {
    super (props)
    this.pickImage = this.pickImage.bind (this)
    this.renderEditLog = this.renderEditLog.bind (this)
    this.renderImagesContainer = this.renderImagesContainer.bind (this)
    this.renderVideosContainer = this.renderVideosContainer.bind (this)
    this.state = {
      images: [],
      videos: [],

      taggedCars: props.taggedCars,

      parts: [],
      taggedUsers: [],

      title: null,
      desription: null,

      listedPrice: null,
      listedMileage: null,
      vin: null,

      listing: false,

      profileData: props.profileData
    }
  }

  componentWillReceiveProps (nextProps) {
    let {taggedCars} = nextProps
    this.setState ({taggedCars})
    console.log (this.props, 'componentWillUpdate')
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
      </View>
    )
  }

  renderEditLog() {
    const {picture, name} = this.state.profileData
        , {taggedCars} = this.state
        , {removeFromTaggedCars} = this.props
    return (
      <View style={{paddingTop: 4, paddingBottom: 20}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={false}
        style={NewPostStyles.taggedCarsScroll}>
        { taggedCars && taggedCars.map ((car, idx)=> {
          return (<F8Button
                    key={`cartag-${idx}`}
                    type="carTag"
                    onPress={()=>{removeFromTaggedCars (car.specId)}}
                    icon={require ('../images/x.png')}
                    caption={`${car.make} ${car.model} ${car.submodel}`}
                    style={{margin: 4}}/>)
        })
        }
      </ScrollView>
      <View style={PostStyles.header}>
        <Image source={{uri: picture}} style={PostStyles.userPhotoStyle}/>
          <TextInput
            placeholder="Tag Line"
            multiline={true}
            maxLength={20}
            style={NewPostStyles.singleLineBlockInput}/>
      </View>
      <TextInput
        placeholder="OMG IT'S FAST"
        multiline={true}
        maxLength={140}
        style={NewPostStyles.largeBlockInput}/>
      </View>
    )
  }

  renderEditListing() {
    return (
      <View style={{paddingTop: 20, paddingBottom: 20}}>
      <FloatLabelTextInput
        placeHolder={"Asking Price ($)"}
        value={"0"}
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
    const leftItem = {title: 'cancel', onPress: Actions.pop}
        , rightItem = {title: 'preview', onPress: Actions.previewDraft}

    let {profileData} = this.props

    return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
      <View style={{flex: 1}}>
        <F8Header
          foreground="dark"
          leftItem={leftItem}
          rightItem={rightItem}
          title="New Post"
          style={General.headerStyle}/>
        {this.renderEditLog()}
        {this.renderImagesContainer()}
        {this.renderVideosContainer()}
        <View style={{position: 'absolute', bottom: 0}}>
        <F8Button icon={require ('../common/img/car.png')} onPress={Actions.PickMakes} type="tertiary" caption="Tag Car" style={NewPostStyles.bottomButtonStyle}/>
        <F8Button icon={require ('../common/img/photo.png')} onPress={()=>this.pickImage('normal')} type="tertiary" caption="Photo" style={NewPostStyles.bottomButtonStyle}/>
        <F8Button icon={require ('../common/img/panovideo.png')} onPress={()=>this.pickVideo('panorama')} type="tertiary" caption="Video" style={NewPostStyles.bottomButtonStyle}/>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

// <View style={{width: 1, backgroundColor: 'lightgray', marginVertical: 12}}/>
// <F8Button icon={require ('../common/img/listing.png')} onPress={Actions.TagListing} type="tertiary" caption="Post As Listing" style={NewPostStyles.topButtonStyle}/>

export default connect (mapStateToProps, mapDispatchToProps) (NewPost)
