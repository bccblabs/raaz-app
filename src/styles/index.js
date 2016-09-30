'use strict'
import React, {Dimensions, StyleSheet, Platform} from 'react-native'
import F8Colors from '../common/F8Colors'
const window = Dimensions.get ('window')

export const General = StyleSheet.create ({
  headerStyle: {
    backgroundColor: 'white'
  },
  largeImageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
    width: 240,
    resizeMode: 'contain',
  },
  topLevelScrollStyle: {
    height: window.height,
    width: window.width,
  },

})

export const Specs = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 4
  },
  item: {
    flexDirection: 'column',
    marginBottom: 4
  },
  subtitle: {
    flex: 1,
    fontSize: 10,
    color: 'black',
    padding: 8,
    paddingTop: 2,
    paddingBottom: 0,
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 10,
    marginRight: 5,
    marginLeft: 10,
  }
})

export const Titles = StyleSheet.create ({
  buildSectionTitle: {
    padding: 10,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 0.6,
    marginTop: 32,
    textDecorationLine: 'underline'
  },
  buildTitle: {
    padding: 16,
    color: 'black',
    justifyContent: 'flex-start'
  },
})

export const ListingStyles = StyleSheet.create ({
  priceLargeTitle: {
    fontSize: 12,
    fontWeight: '900',
    padding: 8,
    color: 'black',
  },
  listingSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  contactDealerButton: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'blue',
    alignSelf: 'center',
    flex: 0,
    height: 50,
    width: window.width,
    margin: 50,
  },
})

export const PartStyles = StyleSheet.create ({
  partsScrollStyle: {
    height: 208,
    width: window.width,
    backgroundColor: '#FFF0F5'
  },
  partContainer: {
    height: 200,
    width: 200,
    margin: 4,
    backgroundColor: 'white'
  },
  partImage: {
    height: 200,
    width: 200,
    resizeMode: 'contain'
  },
  partTitle: {
    padding: 8,
    flex: -1,
    position: 'absolute',
    top: 0,
    color: 'black',
    fontSize: 12,
    backgroundColor: 'white',
    opacity: 0.9,
    fontWeight: '800',
  },
  rating: {
    flex: -1,
    position: 'absolute',
    bottom: 8,
    left: 6,
    color: 'black',
    fontSize: 10,
    backgroundColor: 'white',
    opacity: 1,
    fontWeight: '800',
  },
  partSectionTitle: {
    margin: 10,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 1,
  }
})

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

  loginButton: {
    borderTopWidth: 1,
    borderRadius: 20,
    borderTopColor: 'rgba(0,0,0,0.5)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
    height: 40,
    width: window.width/2.5,
    margin: 12,
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
  },
  horizontalScrollContainer: {
    height: 32,
    width: window.width,
    marginTop: 0,
    backgroundColor: '#FFF0F5'
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
    height: 320,
    width: 240,
    resizeMode: 'contain',
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
  {backgroundColor: '#4D98E4'},
  {backgroundColor: '#59838B'},
  {backgroundColor: '#418E50'},
  {backgroundColor: '#7B7FEC'},
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
  optionsContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  multipleChoiceText: {
    padding: 14,
    fontWeight:'bold',
    color: 'gray',
    alignSelf: 'flex-start',
    fontSize: 14,
    letterSpacing: 0.7,
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
    letterSpacing: 1,
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
    flex: 1,
    position: 'absolute',
    bottom: 8,
    right: 8,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  partTextStyle: {
    padding: 8,
    flex: -1,
    position: 'absolute',
    top: 0,
    color: 'black',
    fontSize: 12,
    backgroundColor: 'white',
    opacity: 0.9,
    fontWeight: '600',
  },
  containerStyle: {
    backgroundColor: 'transparent',

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
    height: window.height/8,
    fontSize: 32,

  },
  singleLineBlockInput: {
    margin: 8,
    width: window.width,
    height: window.height/16,
    fontSize: 18,
    fontWeight: '800'
  },
  headerStyle: {
    backgroundColor: 'black'
  },
  bottomBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
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
  bottomButtonStyle: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    alignSelf: 'center',
    flex: 0,
    height: 50,
    width: window.width,
  }
})
export const PostScreenStyles = StyleSheet.create ({
  profileTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
    letterSpacing: 1,
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
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 16,
    padding: 8
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    flex: 1,
  },
  tags: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'absolute',
    top: 90,
    width: window.width,
    paddingVertical: 8,
  },
  buildtags: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    width: window.width,
    paddingVertical: 4,
  },
  tagsContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  manufacturer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    bottom: 0,
    width: window.width,
    height: 20
  },
  manufacturerContainer: {
    flex: 1,
    alignItems: 'flex-start',
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
    paddingHorizontal: 8
  },
  lc: {
    fontWeight: '600',
    color: 'black',
    paddingHorizontal: 4
  },
  tag: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 4,
    letterSpacing: 0.7,
    fontFamily: 'FontAwesome'
  },
  created: {
    fontSize: 10,
    paddingVertical: 8,
    color: 'black',
    letterSpacing: 0.3,
    fontFamily: 'FontAwesome'
  },
  authorName: {
    fontSize: 15,
    color: F8Colors.lightText,
    letterSpacing: 0.3,
    fontFamily: 'FontAwesome'
  },
  singlePostImage: {
    width: window.width,
    height: window.height/2,
    resizeMode: 'cover',
    alignSelf: 'center'
  },
  imageContainer: {
    width: window.width,
    height: window.height/2,
  },
  largeImage: {
    width: window.width/2,
    height: window.height/2,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: 'white'
  },
  smallImage: {
    width: window.width/2,
    height: window.height/4,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: 'white'
  },
  userPhotoStyle: {
    height: 40,
    width: 40,
    backgroundColor: 'black',
    marginHorizontal: 8,
    resizeMode: 'contain'
  },

})
export const CarmeraStyles = StyleSheet.create ({
  text: {
    fontSize: 11,
    color: 'white',
    letterSpacing: 1,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    padding: 16
  },
  wrapper: {
    flex: -1,
    width: window.width,
    height: window.height/15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export const TuningBySpecStyles = StyleSheet.create ({
  VRImageHolder : {
    width: window.width,
    height: 300,
    alignSelf: 'center'
  },
})
