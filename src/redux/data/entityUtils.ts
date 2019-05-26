import { Entity, EntityMap, EntityInput } from './types'
import uuid from 'uuid'
import produce from 'immer'

export const childrenKey = 'kids'
export const dataKey = 'data'

export const getChildrenIDs = (entity: Entity) =>
    Object.values(entity[childrenKey]).flatMap((value) => value.records)

/**
 * process array of entities and their children recursively
 * replaces child entities with IDs which point to map of all entities
 * @param entityMap map of entities to be populated with processed entities
 * @param entity EntitiInput
 * @returns generated UUIDs for the top-level entities
 */
export const processEntities = (
    entityMap: EntityMap,
    entities: EntityInput[]
): string[] => {
    const processRecursive = (entity: EntityInput) => {
        // generate new ID for the entity
        const ID = uuid()

        Object.entries(entity[childrenKey]).forEach(
            ([relation, value]: [string, any]) => {
                if (value.records) {
                    const IDs = value.records
                        .map((record: any) => {
                            record.parentId = ID
                            return record
                        })
                        .map(processRecursive)

                    entity = produce(entity, (draft) => {
                        draft[childrenKey][relation].records = IDs
                    })
                    return IDs
                }
            }
        )

        // add to the entities map
        entityMap[ID] = {
            ...((entity as any) as Entity),
            id: ID,
        }
        return ID
    }
    return entities.map(processRecursive)
}
