'use strict'
import {createSelector} from 'reselect'
import keys from 'lodash/keys'

/* post selectors */
  export const postEntitiesSelector = (state) => (state.entities.posts || {})

  export const homePostPaginationSelector = (state) => (state.pagination.postsPagination && state.pagination.postsPagination['home'] || {}) 
  export const homePostSelector = createSelector (
    [postEntitiesSelector, homePostPaginationSelector],
    (postEntities, postPagination) => {
      let ids = postPagination.ids?postPagination.ids:[]
      return ids.map (id=>postEntities[id]).filter (elem=>elem)
    }
  )

/* car selector entities */

export const makesSelector = (state) => (keys (state.entities.makes).sort())

/* cars by specs selector */
export const newpostTaggedCars = (state) => (state.newpost.taggedCars.toIndexedSeq().toArray())

/* user selectors */
  export const isLikedByUser = (state) => {return true}
  export const profileSelector = (state) => (state.user.profileData)
  export const userIdSelector = (state) => (state.user.profileData.user_id)
  export const accessTokenSelector = (state) => (state.history.access_token)

/* tags selectors */
  export const selectedTagsSelector = (state, props) => {
    return state.tuning.partTags
  }
  export const tagEntitiesSelector = (state, props) => (state.entities && state.entities.tags || {})
  export const relatedTagPaginationSelector = (state, props) => (state.pagination.relatedTagPagination && state.pagination.relatedTagPagination[props.tag] || {})
  export const relatedTagsSelector = createSelector (
    [tagEntitiesSelector, relatedTagPaginationSelector],
    (tagEntities, tagPagination) => {
      let ids = tagPagination.ids?tagPagination.ids:[]
      return ids.map (id=>tagEntities[id]).filter (elem=>elem)
    }
  )

/* categories */
  export const categoriesEntitiesSelector = (state, props) => (state.entities.categories || {})
  export const categoriesPaginationSelector = (state, props) => (state.pagination.categoriesPagination && state.pagination.categoriesPagination[props.filterId] || {})

  /* build categories */
  export const buildCategoriesSelector = (state) => (state.entities.categories && keys (state.entities.categories['car']))

  export const getCategoriesSelector = createSelector (
    [categoriesEntitiesSelector, categoriesPaginationSelector],
    (categoryEntities, categoryPagination) => {
      let ids = categoryPagination.ids?categoryPagination.ids:[]
      return ids.map (id=>categoryEntities[id])
    }
  )

  export const categoryTagsSelector = (state, props) => {
    let tags = state.entities.categories ? state.entities.categories[props.categoryName] : []
    return tags.options.map ((opt)=>opt.name)
  }

/* builds */
  export const buildsEntitiesSelector = (state) => (state.entities.builds || {})
  export const buildsPaginationSelector = (state) => (state.pagination.buildsPagination && state.pagination.buildsPagination['home'] || {})

  export const buildsSelector = createSelector (
    [buildsEntitiesSelector, buildsPaginationSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const buildPaginationByPartIdSelector = (state, props) => (state.pagination.buildPaginationByPartId && state.pagination.buildPaginationByPartId[props.partId] || {})
  export const buildByPartIdSelector = createSelector (
    [buildsEntitiesSelector, buildPaginationByPartIdSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const buildPaginationBySpecIdSelector = (state, props) => (state.pagination.buildPaginationBySpecId && state.pagination.buildPaginationBySpecId[props.specId] || {})
  export const buildBySpecIdSelector = createSelector (
    [buildsEntitiesSelector, buildPaginationBySpecIdSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const buildPaginationByTagSelector = (state, props) => (state.pagination.buildPaginationByTag && state.pagination.buildPaginationByTag[props.tag] || {})
  export const buildByTagSelector = createSelector (
    [buildsEntitiesSelector, buildPaginationByTagSelector], 
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const buildPaginationByUserIdSelector = (state, props) => (state.pagination.buildPaginationByUserId && state.pagination.buildPaginationByUserId[props.userId] || {})
  export const buildByUserIdSelector = createSelector (
    [buildsEntitiesSelector, buildPaginationByUserIdSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )


/* history selector */
  export const savedSpecsSelector = (state) => (state.history.specs.toIndexedSeq().toArray())
  export const savedPartsSelector = (state) => (state.history.parts.toIndexedSeq().toArray())

  export const isPartSavedSelector = (state, props) => {
    let {part} = props
      , {partId} = part
    return state.history.parts.has (partId)
  }

/* parts selector */
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
