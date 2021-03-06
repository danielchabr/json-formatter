import { StoreShape } from '../store'
import { union } from 'lodash'
import { dataKey } from './entityUtils'
import { UUID } from './types'

export const getRootEntityList = (state: StoreShape) =>
    state.data.rootEntityList

export const getEntities = (state: StoreShape, entityList: UUID[]) => {
    return entityList.map((id) => state.data.entities[id])
}

/**
 * @param state store state
 * @param entityList array of entity IDs
 * @returns array of all attributes that occur in any of the entities
 */
export const getEntitiesAttributes = (state: StoreShape, entityList: UUID[]) =>
    entityList
        .map((id) => state.data.entities[id][dataKey] || [])
        .reduce(
            (attributes: string[], entity) =>
                union(Object.keys(entity), attributes),
            []
        )

export const getLoadingStatus = (state: StoreShape) => state.data.loadingStatus
