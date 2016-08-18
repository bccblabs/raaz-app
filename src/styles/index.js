'use strict'
import React, {Dimensions, StyleSheet, Platform} from 'react-native'
const window = Dimensions.get ('window')
export const Styles = StyleSheet.create ({
  button: {
    borderRadius: 4,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#B8C",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 75,
    alignItems: 'center',
  },

  contactDealerButton: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 50,
    width: window.width,
    flex: 1
  },

  photoButton: {
    borderWidth: 0,
    backgroundColor: 'white',
    flex: 1,
  },

  topLevelContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 0,
  },
  topScrollContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLevelScrollStyle: {
    height: window.height,
    width: window.width,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 49
  },
  horizontalScrollContainer: {
    height: 32,
    width: window.width,
    marginTop: 0,
  },
  horizontalButtonContainer: {
    height: 64,
    flexDirection: 'row'
  },
  horizontalImagesContainer: {
    height: window.width,
    flexDirection: 'row',
  },
  ItemsListStyle: {
    margin: 8
  },
  mapStyle: {
    alignSelf: 'center',
    marginTop: 16,
    height: 350,
    width:  350,
  },
  scrollItem: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: window.width/2,
    padding: 8
  },
  carDetailsTopContainer: {
    width: window.width,
  },
  carDetailsContainer: {
    height: 250,
    width: 250,
    alignItems: 'flex-start',
  },
  carDetailsTitle: {
    alignSelf: 'flex-start',
    margin: 8,
    fontSize: 12,
    color: 'black'
  },
  largeTitleStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 16,
  },
  descriptionText: {
    color: 'black',
    fontSize: 14,
    padding: 8
  },
  carDetailsSubtitle: {
    alignSelf: 'flex-start',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 8,
    marginTop: 16

  },
  ItemsListStyle: {
    height: window.width,
  },

  ItemStyle: {
    margin: 8
  },
  listingsHistoryParallaxBackground: {
    height: window.height,
    width: window.width,
    backgroundColor: 'darkslategray'
  },
  largeImageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    resizeMode: 'cover',
  }
})

export const ButtonStyles = StyleSheet.create ({
  filterActionButton: {
    flex: 1,
    height: 50  ,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },

  // details button
  detailsButtonStyle: {
    flex: 1,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'cadetblue',
    backgroundColor: 'transparent',
    margin: 16
  },
  detailsButtonText: {
    flexWrap: 'wrap',
    padding: 8,
    fontSize: 12,
    color: 'cadetblue',
    textAlign: 'center'
  },

  applyButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: '#1B3B79',
  },

  postOptionButton: {
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 32,
    width: 10,
    borderRadius: 32 / 2,
    borderWidth: 1,
  },
  deselectedLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
  },

})
export const ScrollColorsArray = [
  {backgroundColor: 'lightcoral'},
  {backgroundColor: 'mediumvioletred'},
  {backgroundColor: 'teal'},
  {backgroundColor: 'darkolivegreen'},
  {backgroundColor: 'mediumseagreen'},
]
export const RecallColorsArray = [
  {backgroundColor: 'darkolivegreen'},
  {backgroundColor: 'mediumvioletred'},
  {backgroundColor: 'lightcoral'},
]
export const GraphColorsArray = [
  {backgroundColor: '#F55443'},
  {backgroundColor: '#FCBD24'},
  {backgroundColor: '#59838B'},
  {backgroundColor: '#4D98E4'},
  {backgroundColor: '#418E50'},
  {backgroundColor: '#7B7FEC'},
  {backgroundColor: '#3ABAA4'}
]
export const ParallaxScrollStyles = {
  STICKY_HEADER_HEIGHT: 60,
  PARALLAX_HEADER_HEIGHT: window.height,
  BACKGROUND_IMAGE_HEIGHT: window.heigth,
  BACKGROUND_IMAGE_WIDTH: window.width,
  CARD_HEIGHT: 300,
  parallaxBackgroundImageStyle: {
    height: this.BACKGROUND_IMAGE_HEIGHT,
    width: this.BACKGROUND_IMAGE_WIDTH

  }
}
export const FilterStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  stage: {
    backgroundColor: '#EFEFF4',
    paddingBottom: 20,
    flex: 1
  },
  headerStyle: {
    backgroundColor: 'transparent'
  },
  optionsContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  multipleChoiceText: {
    padding: 10,
    fontWeight:'bold',
    color: 'gray',
    alignSelf: 'flex-start',
    fontSize: 12,
    fontFamily: 'FontAwesome'
  }
})
export const SliderStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding : 16,
  },
  rangeTextContainer: {
    flexDirection: 'row',
    width: window.width,
    alignItems: 'stretch',
    flex: 1
  },
  leftIndicator: {
    position: 'absolute', left: 0, padding: 16,
    fontWeight: 'bold',
    fontSize: 12,
    color: 'seagreen'
  },
  rightIndicator: {
    color: 'olive',
    fontWeight: 'bold',
    fontSize: 12,
    position: 'absolute', right: 0, padding: 16
  },
  sliderTitle: {
    padding: 10,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 12,
    fontFamily: 'FontAwesome'
  },
  avgText: {
    padding: 10,
    fontWeight:'bold',
    color: 'gray',
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'FontAwesome'
  },
  imageStyle: {
    height: 300,
    width: window.width,
    resizeMode: 'cover'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
  },
  image: {
    height: 200,
    width: window.width,
    resizeMode: 'cover'
  }
})
export const FilterCardStyles = StyleSheet.create ({
  cardStyle: {
    flex: 1,
    backgroundColor: 'black',
  },
  titleTextStyle: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  containerStyle: {
    marginLeft: 8,
    backgroundColor: 'transparent'
  },
  horizontalButtonContainer: {
    height: 64,
    flexDirection: 'row'
  },

})
export const NewPostStyles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  largeBlockInput: {
    margin: 8,
    width: window.width,
    height: window.height/8
  },
  singleLineBlockInput: {
    margin: 8,
    width: window.width,
    height: window.height/32
  },
  headerStyle: {
    backgroundColor: 'black'
  },
  bottomBar: {
    backgroundColor: 'transparent',
    // position: 'absolute',
    // bottom: 64,
    // height: 100,
    width: window.width,
  },
  divTitleStyle: {
    padding: 10,
    fontWeight: 'bold',
    color: 'gray',
    alignSelf: 'flex-start',
    fontSize: 12,
    fontFamily: 'FontAwesome'
  },
  addMediaButtonStyle: {
    alignSelf: 'center',
    width: 120,
    padding: 10,
  },
  postTypeButtonStyle: {
    alignSelf: 'center',
    width: 156,
    padding: 10,
  },
  actionButtonStyle: {
    borderColor: 'black',
    width: 120,
    padding: 10,
  }
})
export const PostScreenStyles = StyleSheet.create ({
  profileTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16
  },
  profileInfoView: {
    width: 100,
    backgroundColor: 'transparent'
  },
  profileContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 16,
  }
})
export const EmptyViewStyles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    marginBottom: 35,
    color: 'black',
  },

})
export const ScrollColorsNum = ScrollColorsArray.length
export const RecallColorsNum = RecallColorsArray.length
export const PostStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8
  },
  tags: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  lc: {
    fontWeight: '600',
    color: 'black',
    paddingHorizontal: 4
  },
  tag: {
    fontWeight: '500',
    color: 'black',
    paddingHorizontal: 2
  },
  created: {
    paddingVertical: 8,
    color: 'mediumvioletred',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  singlePostImage: {
    width: window.width - 32,
    height: window.width - 32,
    resizeMode: 'cover',
    alignSelf: 'center'
  }
})
export const CarmeraStyles = StyleSheet.create ({
  linearGradient: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: 'black',
    backgroundColor: 'transparent',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    height: 150,
    width: window.width
  },
  background: {
    height: 150,
    width: window.width,
    justifyContent: 'center',
  }
})

export const TuningBySpecStyles = StyleSheet.create ({
  VRImageHolder : {
    flex: 1,
    width: window.width,
    height: 300
  }
})
