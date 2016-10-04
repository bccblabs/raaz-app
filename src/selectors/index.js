'use strict'
import {createSelector} from 'reselect'

export const newpostTaggedCars = (state) => {return state.newpost.taggedCars.toIndexedSeq().toArray()}

export const isLikedByUser = (state) => {return true}

export const profileSelector = (state) => {return state.user.profileData}

export const categoriesEntitiesSelector = (state, props) => (state.entities.categories && state.entities.categories || {})

export const categoriesPaginationSelector = (state, props) => (state.pagination.categoriesPagination && state.pagination.categoriesPagination[props.filterId] || {})

export const selectedTagsSelector = (state, props) => {
  if (props.filterId === 'car') return state.tuning.buildTags
  else return state.tuning.partTags
}

export const getCategoriesSelector = createSelector (
  [categoriesEntitiesSelector, categoriesPaginationSelector],
  (categoryEntities, categoryPagination) => {
    let ids = categoryPagination.ids?categoryPagination.ids:[]
    return ids.map (id=>categoryEntities[id])
  }
)
