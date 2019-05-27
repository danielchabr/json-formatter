import { setEntities, removeEntity, setRootEntityList } from './actions'
import { LoadingStateEnum } from './types'
import dataReducer from './reducer'
import { getEntitiesAttributes } from './selectors'
import { dataKey } from './entityUtils'
import { StoreShape } from '../store'

const entityList = {
    loadingStatus: { state: LoadingStateEnum.NONE },
    entities: {},
    rootEntityList: [],
}

it('set entities', () => {
    const mockState = {
        data: {
            entities: {
                a: {
                    [dataKey]: {
                        attr1: '',
                        attr2: '',
                    },
                },
                b: {
                    [dataKey]: {
                        attr2: '',
                        attr3: '',
                    },
                },
            },
        },
    }
    const attributes = getEntitiesAttributes((mockState as any) as StoreShape, [
        'a',
        'b',
    ])

    expect(attributes.length).toEqual(3)
    expect(attributes).toContain('attr1')
    expect(attributes).toContain('attr2')
    expect(attributes).toContain('attr3')
})
