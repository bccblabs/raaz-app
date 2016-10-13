'use strict'
import React, {
  Component,
  Image,
  Text,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import {fetchDealsFromApi} from '../reducers/tuning/filterActions'
import {createSelector} from 'reselect'
import Swiper from 'react-native-swiper'
import {SliderStyles} from '../styles'
import {Heading3} from '../common/F8Text'


const specIdSelector = (state) => (state.stockCar.selectedSpecId)
const dealsEntitiesSelector = (state) => (state.entities.deals)
const dealsPaginationSelector = (state) => (state.pagination.dealsPagination)

const getDealsSelector = createSelector (
  [specIdSelector, dealsEntitiesSelector, dealsPaginationSelector],
  (specId, dealsEntities, dealsPagination) => {
    let ids
    if (specId !== '') {
      ids = dealsPagination[specId].ids
    } else if (dealsPagination['home']) {
      ids = dealsPagination['home'].ids
    } else {
      ids = []
    }
    return ids.map (id=>dealsEntities[id])
  }
)

const getDealsPagination = createSelector (
  [specIdSelector, dealsPaginationSelector],
  (specId, dealsPagination) => {
    return dealsPagination[specId] || dealsPagination['home'] || {}
  }
)

const mapStateToProps = (state) => {
  return {
    dealsList: getDealsSelector (state),
    dealsPagination: getDealsPagination (state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeals: (specId)=> {dispatch (fetchDealsFromApi (specId))},
  }
}

class Deals extends Component {
  constructor (props) {
    super (props)
    this.setState ({
      dealsList: props.dealsList,
      dealsPagination: props.dealsPagination
    })
  }

  componentWillMount () {
    let {fetchDeals, specId, dealsList, dealsPagination} = this.props
    this.setState ({dealsList, dealsPagination})
    fetchDeals (specId)
  }

  componentWillReceiveProps (nextProps) {
    let {dealsList, dealsPagination} = nextProps
    this.setState ({dealsList, dealsPagination})
  }

  render () {
    let {dealsList} = this.state
    return (
      <View style={{margin: 4, flex: 1}}>
      <Swiper
        dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
        paginationStyle={{
          bottom: -23, left: null, right: 10,
        }}
        loop={true}
        autoplay={true}
        height={200}
        showButtons={true}>
        {
          dealsList.map ((deal, idx)=>{
            let {dealImage, title, dealId} = deal
            return (
              <View key={idx} style={SliderStyles.slide}>
                <Image style={SliderStyles.image} source={{uri: dealImage}}/>
              </View>
            )
          })
        }
      </Swiper>
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Deals)
