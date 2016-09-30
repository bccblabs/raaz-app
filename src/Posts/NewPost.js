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

const mapStateToProps = (state) => {
  return {
    profileData: state.user.profileData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch}
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

      selectedMake: null,
      selectedModel: null,
      selectedSubmodel: null,
      selectedSpecId: null,

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

    return (
      <View style={{paddingTop: 20, paddingBottom: 20}}>
      <F8Button icon={require ('../common/img/car.png')} onPress={()=>this.pickVideo('panorama')} type="tertiary" caption="Tag Your Car" style={[NewPostStyles.bottomButtonStyle, {borderWidth: 1, borderColor: '#eee'}]}/>
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

        <View style={NewPostStyles.bottomBar}>
          <F8Button icon={require ('../common/img/tuning.png')} onPress={()=>this.pickVideo('panorama')} type="tertiary" caption="Tag Tuned Parts" style={NewPostStyles.bottomButtonStyle}/>
          <F8Button icon={require ('../common/img/listing.png')} onPress={()=>this.pickVideo('panorama')} type="tertiary" caption="Post As Listing" style={NewPostStyles.bottomButtonStyle}/>
          <F8Button icon={require ('../common/img/photo.png')} onPress={()=>this.pickImage('normal')} type="tertiary" caption="Add Photos" style={NewPostStyles.bottomButtonStyle}/>
          <F8Button icon={require ('../common/img/panoimage.png')} onPress={()=>this.pickImage('panorama')} type="tertiary" caption="Add 360 Photos" style={NewPostStyles.bottomButtonStyle}/>
          <F8Button icon={require ('../common/img/video.png')} onPress={()=>this.pickVideo('normal')} type="tertiary" caption="Add Videos" style={NewPostStyles.bottomButtonStyle}/>
          <F8Button icon={require ('../common/img/panovideo.png')} onPress={()=>this.pickVideo('panorama')} type="tertiary" caption="Add 360 Video" style={NewPostStyles.bottomButtonStyle}/>
        </View>

      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (NewPost)
