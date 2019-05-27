import { createReducer } from 'redux-act'
import produce from 'immer'
import {
    setEntities,
    setRootEntityList,
    removeEntity,
    setLoadingError,
    setLoadingInProgress,
    setLoadingSuccess,
} from './actions'
import { Entity, LoadingStateEnum } from './types'
import { childrenKey, getChildrenIDs } from './entityUtils'

export interface DataShape {
    loadingStatus: {
        state: LoadingStateEnum
        error?: string
    }
    entities: {
        [UUID: string]: Entity
    }
    rootEntityList: string[]
}

const defaultState: DataShape = {
    loadingStatus: {
        state: LoadingStateEnum.NONE,
    },
    entities: {},
    rootEntityList: [],
}

export default createReducer<DataShape>({}, defaultState)
    .on(setEntities, (state, payload) =>
        produce(state, (draft) => {
            draft.entities = payload
        })
    )
    .on(setRootEntityList, (state, payload) =>
        produce(state, (draft) => {
            draft.rootEntityList = payload
        })
    )
    .on(setLoadingError, (state, payload) =>
        produce(state, (draft) => {
            draft.loadingStatus.state = LoadingStateEnum.ERROR
            draft.loadingStatus.error = payload
        })
    )
    .on(setLoadingInProgress, (state) =>
        produce(state, (draft) => {
            draft.loadingStatus.state = LoadingStateEnum.IN_PROGRESS
        })
    )
    .on(setLoadingSuccess, (state) =>
        produce(state, (draft) => {
            draft.loadingStatus.state = LoadingStateEnum.SUCCESS
        })
    )
    .on(removeEntity, (state, payload) =>
        produce(state, (draft) => {
            // remove from root entity list
            draft.rootEntityList = draft.rootEntityList.filter(
                (id) => id !== payload
            )

            // remove from parents` list of children
            const parentId = draft.entities[payload].parentId
            if (parentId) {
                const children = draft.entities[parentId][childrenKey]

                Object.entries(children).forEach(([relation, value]) => {
                    value.records = value.records.filter((id) => id !== payload)

                    // delete the whole relation, if there are no more children in relation,
                    if (value.records.length === 0) {
                        delete children[relation]
                    }
                })
            }

            // remove all children recursively
            const removeChildrenRec = (entity: Entity) => {
                getChildrenIDs(entity).forEach((id) => {
                    removeChildrenRec(draft.entities[id])
                    delete draft.entities[id]
                })
            }
            removeChildrenRec(draft.entities[payload])

            // remove from entities
            delete draft.entities[payload]
        })
    )
