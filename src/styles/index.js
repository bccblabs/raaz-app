'use strict'
import React, {Dimensions, StyleSheet, Platform} from 'react-native'
import F8Colors from '../common/F8Colors'
const window = Dimensions.get ('window')
export const btnColor = '#b8cdfb'

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
  bottomButtonStyle: {
    backgroundColor: btnColor,
    alignSelf: 'center',
    flex: 0,
    height: 60,
    borderWidth: 4,
    borderColor: 'white',
    width: window.width,
  }
})

export const Header = StyleSheet.create ({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  clear: {
    marginHorizontal: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 9,
    paddingVertical: 8,
    fontWeight: '500',
    color: 'black',
    letterSpacing: 0.3,
  }

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
  subtitle1: {
    flex: 1,
    fontSize: 8,
    color: 'black',
    padding: 8,
    paddingTop: 2,
    paddingBottom: 0,
  },
  subtitle2: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    padding: 8,
    paddingTop: 2,
    paddingBottom: 0,
    fontWeight: '700'
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
    letterSpacing: 1,
    marginTop: 32,
  },
  filterSectionTitle: {
    padding: 10,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 1,
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
})

export const PartStyles = StyleSheet.create ({
  partsScrollStyle: {
    height: 128,
    width: window.width,
    backgroundColor: '#FFF0F5'
  },
  partContainer: {
    height: 100,
    width: window.width/3,
    margin: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  partImage: {
    height: 80,
    width: 80,
    resizeMode: 'contain'
  },
  partTitle: {
    padding: 8,
    flex: 1,
    color: 'black',
    fontSize: 8,
    alignSelf: 'center',
    backgroundColor: 'transparent',
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
  mapStyle: {
    alignSelf: 'center',
    marginTop: 16,
    height: 350,
    width:  350,
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
})

export const GraphColorsArray = [
  {backgroundColor: '#4D98E4'},
  {backgroundColor: '#59838B'},
  {backgroundColor: '#418E50'},
  {backgroundColor: '#7B7FEC'},
]

export const FilterStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  }
})

export const NewPostStyles = StyleSheet.create ({


  taggedCarsScroll: {
    width: window.width,
    backgroundColor: 'transparent'
  },
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
  commentInput: {
    flex: -1,
    paddingHorizontal: 8,
    width: window.width-80,
    height: window.height/20,
    fontSize: 12,
    fontWeight: '800',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  postCommentBtn: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#b8cdfb',
    alignSelf: 'center',
    flex: 0,
    height: 50,
    width: window.width,
  },
  headerStyle: {
    backgroundColor: 'black'
  },
  bottomBar: {
    backgroundColor: 'transparent',
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
  },
  topButtonStyle: {
    alignSelf: 'center',
    flex: 1,
    height: 50,
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

export const PostStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 8,
    padding: 8
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    flex: 1,
  },
  tags: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: window.width,
    paddingVertical: 8,
  },
  tagsContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 8
  },
  tag: {
    color: 'black',
    fontSize: 10,
    paddingHorizontal: 4,
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
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
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
    height: window.height/3,
    resizeMode: 'cover',
    borderColor: 'white'
  },
  horizontalImage: {
    width: window.width,
    height: window.height/3,
    resizeMode: 'contain',
    borderColor: 'white'
  },

  postsHorizontal: {
    width: window.width,
    height: window.height/3,
  },
  horizontalTitle: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
    width: window.width/4,
    left: window.width/12,
    fontSize: 18,
    fontWeight: '500',
  },

  horizontalImageContainer: {
    flex: 1
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
