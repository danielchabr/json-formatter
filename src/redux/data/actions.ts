import { createAction } from 'redux-act'
import { Dispatch, Action } from 'redux'
import { Entity, DataShape } from './reducer'
import uuid from 'uuid'

export const setEntities = createAction<{ [id: string]: Entity }>(
    'set entity data'
)
export const setRootEntityList = createAction<string[]>('set root entity list')
export const dataLoadingError = createAction<string>('error loading data')

export const loadFileAsync = (file: File) => {
    return (dispatch: Dispatch<Action<any>>) => {
        try {
            const fileReader = new FileReader()
            fileReader.onloadend = () => {
                const content = fileReader.result as string
                const parsedData = JSON.parse(content)
                normalizeDataAsync(parsedData)(dispatch)
            }
            fileReader.onerror = () => {
                fileReader.abort()
                throw new Error('Error loading file')
            }
            fileReader.readAsText(file)
        } catch (error) {
            dispatch(dataLoadingError(JSON.stringify(error)))
        }
    }
}

export const normalizeDataAsync = (data: any) => {
    return (dispatch: Dispatch<Action<any>>) => {
        const normalizedData: DataShape = {
            entities: {},
            rootEntityList: [],
        }

        const childrenKey = 'kids'

        const processEntity = (entity: any): string => {
            const ID = uuid()
            entity.ID = ID

            // process children
            Object.entries(entity[childrenKey]).flatMap(
                ([relation, value]: [string, any]) => {
                    if (value.records) {
                        const IDs = value.records.map(processEntity)
                        entity[childrenKey][relation].records = IDs
                        return IDs
                    }
                }
            )

            normalizedData.entities[ID] = entity
            return ID
        }

        normalizedData.rootEntityList = data.map(processEntity)

        console.log(normalizedData)
        dispatch(setEntities(normalizedData.entities))
        dispatch(setRootEntityList(normalizedData.rootEntityList))
    }
}
