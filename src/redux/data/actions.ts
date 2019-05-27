import { createAction } from 'redux-act'
import { Dispatch, Action } from 'redux'
import { Entity, EntityInput } from './types'
import { EntityMap } from './types'
import { processEntities } from './entityUtils'
import { normalize, schema } from 'normalizr'
import uuid from 'uuid'

export const removeEntity = createAction<string>('remove entity')
export const setEntities = createAction<{ [id: string]: Entity }>(
    'set entity data'
)
export const setRootEntityList = createAction<string[]>('set root entity list')

export const setLoadingError = createAction<string>('error loading data')
export const setLoadingSuccess = createAction('success loading data')
export const setLoadingInProgress = createAction('loading data')

export const loadFileAsync = (file: File) => {
    return (dispatch: Dispatch<Action<any>>) => {
        const fileReader = new FileReader()
        dispatch(setLoadingInProgress())
        fileReader.onloadend = () => {
            const content = fileReader.result as string
            try {
                const parsedData = JSON.parse(content)
                // normalizeDataAsync(parsedData)(dispatch)
                normalizrAsync(parsedData)(dispatch)
            } catch (error) {
                dispatch(setLoadingError(error && error.message))
            }
        }
        fileReader.onerror = () => {
            fileReader.abort()
            dispatch(setLoadingError('Error loading file'))
        }
        fileReader.readAsText(file)
    }
}

export const normalizrAsync = (data: EntityInput[]) => (
    dispatch: Dispatch<Action<any>>
) => {
    const entityMap: EntityMap = {}
    const IDs: string[] = []

    const entity = new schema.Entity(
        'entity',
        {},
        {
            idAttribute: 'id',
            processStrategy: (value) => {
                if (!Object.prototype.hasOwnProperty.call(value, 'id')) {
                    value.id = uuid()
                }
                return { ...value }
            },
        }
    )
    const values = new schema.Values({
        records: new schema.Array(entity),
    })
    entity.define({ kids: values })
    const normalizedData = normalize(data, [entity])

    dispatch(setEntities(normalizedData.entities.entity))
    dispatch(setRootEntityList(normalizedData.result))
    dispatch(setLoadingSuccess())
}

export const normalizeDataAsync = (data: EntityInput[]) => (
    dispatch: Dispatch<Action<any>>
) => {
    const entityMap: EntityMap = {}
    const IDs: string[] = processEntities(entityMap, data)

    dispatch(setEntities(entityMap))
    dispatch(setRootEntityList(IDs))
    dispatch(setLoadingSuccess())
}
