import { normalize } from 'normalizr'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-act'
import { entitiesSchema } from './entityUtils'
import { EntityInput, UUID, EntityMap } from './types'

export const removeEntity = createAction<UUID>('remove entity')
export const setEntities = createAction<EntityMap>('set entity data')
export const setRootEntityList = createAction<UUID[]>('set root entity list')

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
                normalizeData(parsedData)(dispatch)
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

export const normalizeData = (data: EntityInput[]) => (
    dispatch: Dispatch<Action<any>>
) => {
    const normalizedData = normalize(data, entitiesSchema)

    dispatch(setEntities(normalizedData.entities.entity || {}))
    dispatch(setRootEntityList(normalizedData.result))
    dispatch(setLoadingSuccess())
}
