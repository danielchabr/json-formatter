import { createReducer } from 'redux-act'
import produce from 'immer'
import { setEntities, dataLoadingError, setRootEntityList } from './actions'

type UUID = string
export interface Entity {
    id: UUID
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
            console.log(payload)
        })
    )
    .on(setRootEntityList, (state, payload) =>
        produce(state, (draft) => {
            draft.rootEntityList = payload
            console.log(payload)
        })
    )
    .on(dataLoadingError, (state, payload) =>
        produce(state, (draft) => {
            console.log(payload)
        })
    )
