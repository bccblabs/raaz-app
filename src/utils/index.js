'use strict'

var diff = require ('changeset')

export const Utils = {

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
