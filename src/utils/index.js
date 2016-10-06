'use strict'

var diff = require ('changeset')

export const Utils = {


    parseLabelName (name) {
      switch (name) {
        case 'horsepower':
          return 'Horsepower (hp)'
        case 'torque':
          return 'Torque (lb/ft)'
        case 'city':
          return 'City MPG'
        case 'highway':
          return 'Highway MPG'
        case 'displacement':
          return 'Displacement (cc)'
        case 'max_hp_rpm':
          return 'Max Horsepower RPM'
        case 'max_tq_rpm':
          return 'Max Torque RPM'
        case 'baseMSRP':
          return 'Base MSRP ($)'
        case 'baseInvoice':
          return 'Base Invoice ($)'
        case 'usedTmvRetail':
          return 'Used Retail By Edmunds True Market Value ($)'
        case 'usedPrivateParty':
          return 'Used Private Seller By Edmunds ($)'
        case 'usedTradeIn':
          return 'Used Trade-In By Edmunds ($)'
        case 'compressionRatio':
          return 'Compression Ratio'
        case 'cylinder':
          return 'Cylinders'
        case 'cargo_capacity':
          return 'Cargo Capacity (cubic inches)'
        case 'wheel_base':
          return 'Wheel Base (ft)'
        case 'turning_diameter':
          return 'Turning Diameter'
        case 'zero_sixty':
          return '0-60 MPH (s)'
        case 'ground_clearance':
          return 'Ground Clearance'
        case 'curb_weight':
          return 'Curb Weight'
        case 'drag':
          return 'Drag'
        case 'fuel':
          return '5-Year Fuel Cost ($)'
        case 'depreciation':
          return '5-Year Depreciation Cost ($)'
        case 'repairs':
          return '5-Year Repairs Cost ($)'
        case 'maintenance':
          return '5-Year Maintenance Cost ($)'
        case 'insurance':
          return '5-Year Insurance Cost ($)'
        case 'invoice':
          return 'Dealer Invoice Price ($)'
        case 'msrp':
          return 'Dealer MSRP ($)'
        case 'mileage':
          return 'Mileage'
        case 'interior_vol':
          return 'Interior Volume (cubic inches)'
        case 'tqGain':
          return 'Torque Gain (LB/FT)'
        case 'hpGain':
          return 'Horsepower Gain (HP)'
        case 'maxHp':
          return 'Maximum Horsepower (HP)'
        case 'maxTq':
          return 'Maximum Torque (LB/FT)'
        case 'labor':
          return 'Labor (Hours)'
        case 'weight':
          return 'Weight (LB)'
        case 'rearLowering':
          return 'Rear Lowering (inches)'
        case 'frontLowering':
          return 'Front Lowering (inches)'
        case 'rearSpringRateStiffness':
          return 'Rear Spring Stiffness Rate (%)'
        case 'frontSpringRateStiffness':
          return 'Front Spring Stiffness Rate (%)'
        default:
          console.error ('key not defined', name)
          return name
      }
    },

  parsePriceName (priceName) {
    switch (priceName) {
      case 'listPrice':
        return 'Listed Price'
      case 'msrp':
        return 'MSRP'
      case 'invoice':
        return 'Invoice'
      case 'dealerOfferPrice':
        return 'Dealer Offer'
      default:
        return priceName
    }
  },

  parseMetricFields (title, obj) {
    let entries = []
    Object.keys (obj).forEach ((key)=>{
        if (typeof obj[key] === 'number' && key !== 'year') {
          entries.push ({name: key, value: obj[key]})
        }
        if (key === 'prices') {
          return obj[key].map ((item)=>{
            entries.push ({name: item.price_name, value: item.price_value})
          })
        }
    })
    entries.filter ((item)=>{return typeof item !== 'undefined'}).sort ((a,b)=>a.name > b.name)
    return {title, entries}
  },

  convertDate (date: string) { // change the date like '2015-11-05' into '2015/11/05'
    return date.replace(new RegExp('-', 'g'), '/') // 居然是一个一个替换,使用正则表达式解决方案
  },

  getCurrentDate () {
    // this.extendDate()
    return new Date().Format('yyyy/MM/dd')
  },

  extendDate () {
    Date.prototype.Format = function (fmt) {
      var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 这里主要是为了适配before API
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
    }
  },

  computeVin (listingVin) {
    if (typeof listingVin !== 'undefined' || typeof listingVin !== 'null') {
      return listingVin.substring (0, 8) + listingVin.substring (9, 11)
    }
    return undefined
  },

  capitalize (terms) {
    return terms.split (' ').map ((term)=>term.replace(term[0], term[0].toUpperCase())).join (' ')
  },




}


export function createFilterArray (currState, initState) {
    let currFilter = currState.toJS(), initialFilter = initState.toJS()
    var dirtyFilters = diff (currFilter, initialFilter)
    return dirtyFilters.map ((filter)=>{return {category: [filter.key[0]][0], value: currFilter[filter.key[0]]}})
}

export function renderRange (min, max, unit) {
  if (!min || !max)
    return undefined
  else if (min === max) {
    return min
  }
  else {
    return min + '-' + max
  }
}

export function* range (begin, end, interval = 1) {
    for (let i = begin; i < end; i += interval) {
        yield i;
    }
}


export async function queryFacebookAPI(path, ...args) {
  return new Promise((resolve, reject) => {
    FacebookSDK.api(path, ...args, (response) => {
      if (response && !response.error) {
        resolve(response);
      } else {
        reject(response && response.error);
      }
    });
  });
}


// module.exports = Utils
