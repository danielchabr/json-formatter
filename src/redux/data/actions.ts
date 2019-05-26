import { createAction } from 'redux-act'
import { Dispatch, Action } from 'redux'
import { Entity, childrenKey } from './reducer'
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
                normalizeDataAsync(parsedData)(dispatch)
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

export const normalizeDataAsync = (data: any) => {
    return (dispatch: Dispatch<Action<any>>) => {
        const entities: {
            [UUID: string]: Entity
        } = {}

        const processEntity = (entity: any): string => {
            const ID = uuid()
            entity.id = ID

            // process children
            Object.entries(entity[childrenKey]).flatMap(
                ([relation, value]: [string, any]) => {
                    if (value.records) {
                        const IDs = value.records
                            .map((record: any) => {
                                record.parentId = ID
                                return record
                            })
                            .map(processEntity)

                        entity[childrenKey][relation].records = IDs
                        return IDs
                    }
                }
            )

            entities[ID] = entity
            return ID
        }

        const rootEntityList = data.map(processEntity)

        dispatch(setEntities(entities))
        dispatch(setRootEntityList(rootEntityList))
        dispatch(setLoadingSuccess())
    }
}
