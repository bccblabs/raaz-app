'use strict'
import React, {
  Component,
  View,
  Text,
  ScrollView
} from 'react-native'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Actions} from 'react-native-router-flux'


import {Map} from 'immutable'

import Listing from '../components/Listing'
import PureListView from '../common/PureListView'


const getAllSavedCars = (state) => (state.history.saved_listings)
const getAllSavedVins = (state) => (state.history.saved_skus)

const getAllSavedEntities = createSelector (
  [getAllSavedVins, getAllSavedCars],
  (savedVins, savedCars) => {
    return savedVins.map ((vin)=>{
      let listingObject = savedCars.get(vin)
      return Map.isMap (listingObject)?listingObject.toObject():listingObject
    }).toArray()
  }
)

const mapStateToProps = (state) => {
  return {
    savedListingsEntities: getAllSavedEntities (state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onShowListingDetails: (listingData) => {
      Actions.Listing ({listing: listingData})
    }
  }
}

class ViewedListingsView extends Component {
  constructor (props) {
    super (props)
    this.state = {
      savedEntities: []
    }

    this._innerRef = null;
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderSavedItem = this.renderSavedItem.bind(this);
    this.renderEmptyList = this.renderEmptyList.bind(this);
    this.storeInnerRef = this.storeInnerRef.bind(this);
  }

  componentWillMount () {
      let savedEntities = this.props.savedListingsEntities
      this.setState ({savedEntities})
  }

  _renderSavedItem (listing, sectionId, hightlightRow) {
    return <Listing key={sectionId} listing={listingObject}/>
  }

  render () {
    let {savedEntities} = this.state
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={savedEntities}
        renderRow={this.renderSavedItem}
        {...this.props}
      />
    )
  }

  renderSectionHeader(sectionData: any, sectionID: string): ?ReactElement{
    const {renderSectionHeader} = this.props;
    return renderSectionHeader && renderSectionHeader(sectionData, sectionID);
  }

  renderEmptyList(): ?ReactElement {
    const {renderEmptyList} = this.props;
    return renderEmptyList && renderEmptyList(this.props.day);
  }

  renderSavedItem (listing, sectionId, hightlightRow) {
    const listingObject = Map.isMap(listing.listing)?listing.listing.toJS():listing.listing
    return <Listing key={sectionId} listing={listingObject}
                    onShowListing={this.props.onShowListingDetails}/>
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (ViewedListingsView)
