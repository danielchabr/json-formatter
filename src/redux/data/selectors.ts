import { StoreShape } from '../store'
import { union } from 'lodash'

export const getRootEntityList = (state: StoreShape) =>
    state.data.rootEntityList

export const getEntities = (state: StoreShape, entityList: string[]) => {
    return entityList.map((id) => state.data.entities[id])
}

export const getEntitiesAttributes = (
    state: StoreShape,
    entityList: string[]
) =>
    entityList
        .map((id) => state.data.entities[id].data)
        .reduce(
            (attributes: string[], entity) =>
                union(Object.keys(entity), attributes),
            []
        )

export const getLoadingStatus = (state: StoreShape) => state.data.loadingStatus
