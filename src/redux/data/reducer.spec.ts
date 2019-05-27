import { setEntities, removeEntity, setRootEntityList } from './actions'
import { LoadingStateEnum } from './types'
import dataReducer from './reducer'

const defaultDataState = {
    loadingStatus: { state: LoadingStateEnum.NONE },
    entities: {},
    rootEntityList: [],
}

it('set entities', () => {
    const id = 'abc'
    const reducerResult = dataReducer(
        defaultDataState,
        setEntities({
            [id]: {
                id,
                data: {
                    name: 'x',
                },
                kids: {},
            },
        })
    )

    expect(reducerResult.entities[id].id).toEqual(id)
})

describe('removeEntity reducer', () => {
    it('remove entity with parent', () => {
        const id = 'abc'
        const childId = 'child'
        const setEntitiesResult = dataReducer(
            defaultDataState,
            setEntities({
                [id]: {
                    id,
                    data: {
                        name: 'x',
                    },
                    kids: {
                        relation: {
                            records: [childId],
                        },
                    },
                },
                [childId]: {
                    id: childId,
                    parentId: id,
                    data: {},
                    kids: {},
                },
            })
        )
        const removeChildResult = dataReducer(
            setEntitiesResult,
            removeEntity(childId)
        )

        expect(removeChildResult.entities[childId]).toBeUndefined()
        expect(removeChildResult.entities[id].id).toEqual(id)
        expect(removeChildResult.entities[id].kids.relation).toBeUndefined()
    })
    it('remove entity with children', () => {
        const id = 'abc'
        const childId = 'child'
        const setRootEntityListResult = dataReducer(
            defaultDataState,
            setRootEntityList([id])
        )
        const setEntitiesResult = dataReducer(
            setRootEntityListResult,
            setEntities({
                [id]: {
                    id,
                    data: {
                        name: 'x',
                    },
                    kids: {
                        relation: {
                            records: [childId],
                        },
                    },
                },
                [childId]: {
                    id: childId,
                    parentId: id,
                    data: {},
                    kids: {},
                },
            })
        )
        const removeChildResult = dataReducer(
            setEntitiesResult,
            removeEntity(id)
        )

        expect(removeChildResult.entities[childId]).toBeUndefined()
        expect(removeChildResult.entities[id]).toBeUndefined()
        expect(setEntitiesResult.rootEntityList.length).toEqual(1)
        expect(removeChildResult.rootEntityList.length).toEqual(0)
    })
})
