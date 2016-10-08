'use strict'
import {createSelector} from 'reselect'
import keys from 'lodash/keys'

/* car selector entities */

export const makesSelector = (state) => {return keys (state.entities.makes).sort()}

/* cars by specs selector */
export const newpostTaggedCars = (state) => {return state.newpost.taggedCars.toIndexedSeq().toArray()}

/* history selectors */
export const savedSpecsSelector = (state) => {return state.history.specs.toIndexedSeq().toArray()}
export const savedPartsSelector = (state) => {return state.history.parts.toIndexedSeq().toArray()}


export const isLikedByUser = (state) => {return true}
export const profileSelector = (state) => {return state.user.profileData}
export const selectedTagsSelector = (state, props) => {
  if (props.filterId === 'car') return state.tuning.buildTags
  else return state.tuning.partTags
}



/* categories */
export const categoriesEntitiesSelector = (state, props) => (state.entities.categories || {})
export const categoriesPaginationSelector = (state, props) => (state.pagination.categoriesPagination && state.pagination.categoriesPagination[props.filterId] || {})
export const getCategoriesSelector = createSelector (
  [categoriesEntitiesSelector, categoriesPaginationSelector],
  (categoryEntities, categoryPagination) => {
    let ids = categoryPagination.ids?categoryPagination.ids:[]
    return ids.map (id=>categoryEntities[id])
  }
)

export const categoryTagsSelector = (state, props) => {
  let tags = state.entities.categories ? state.entities.categories[props.categoryName] : []
  console.log ('tags', tags)
  return tags.options.map ((opt)=>opt.name)
}

/* parts */
export const partsEntitiesSelector = (state, props) => (state.entities.parts || {})
export const partsPaginationSelector = (state, props) => (state.pagination.partsPagination && state.pagination.partsPagination[props.specId] || {})
export const partsBySpecIdSelector = createSelector (
  [partsEntitiesSelector, partsPaginationSelector],
  (partsEntities, partsPagination) => {
    let ids = partsPagination.ids?partsPagination.ids:[]
    return ids.map (id=>partsEntities[id]).filter (elem=>elem)
  }
)


export const partsByManufacturerPaginationSelector = (state, props) => (state.pagination.partsPaginationByManufacturer && state.pagination.partsPaginationByManufacturer[props.manufacturerId] || {})
export const partsByManufacturerSelector = createSelector (
  [partsEntitiesSelector, partsByManufacturerPaginationSelector],
  (partsEntities, partsPagination) => {
    let ids = partsPagination.ids ? partsPagination.ids: []
    return ids.map (id=>partsEntities[id]).filter (elem=>elem)
  }
)
