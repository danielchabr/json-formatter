import { createReducer } from 'redux-act'
import produce from 'immer'
import {
    setEntities,
    dataLoadingError,
    setRootEntityList,
    removeEntity,
} from './actions'

export const childrenKey = 'kids'

type UUID = string
export interface Entity {
    id: UUID
    parentId: UUID
    data: {
        [key: string]: any
    }
    kids: {
        [relation: string]: {
            records: UUID[]
        }
    }
}

export interface DataShape {
    entities: {
        [UUID: string]: Entity
    }
    rootEntityList: string[]
}

const defaultState: DataShape = {
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
    .on(dataLoadingError, (state, payload) =>
        produce(state, (draft) => {
            console.error(payload)
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
                    children[relation].records = children[
                        relation
                    ].records.filter((id) => id !== payload)

                    // delete the whole relation, if there are no more children in relation,
                    if (children[relation].records.length === 0) {
                        delete children[relation]
                    }
                })
            }

            // remove all children
            const getChildrenIds = (entity: Entity) =>
                Object.values(entity[childrenKey]).flatMap(
                    (value) => value.records
                )

            const removeChildrenRec = (entity: Entity) => {
                getChildrenIds(entity).forEach((id) => {
                    removeChildrenRec(draft.entities[id])
                    delete draft.entities[id]
                })
            }
            removeChildrenRec(draft.entities[payload])

            // remove from entities
            delete draft.entities[payload]
        })
    )
