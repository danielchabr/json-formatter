import { Entity } from './types'
import uuid from 'uuid'
import { schema } from 'normalizr'

export const childrenKey = 'kids'
export const dataKey = 'data'

export const getChildrenIDs = (entity: Entity) =>
    Object.values(entity[childrenKey]).flatMap((value) => value.records)

const entitySchema = new schema.Entity(
    'entity',
    {},
    {
        idAttribute: 'id',
        processStrategy: (entity, parent, key) => {
            if (!Object.prototype.hasOwnProperty.call(entity, 'id')) {
                entity.id = uuid()
            }

            Object.values(entity[childrenKey]).forEach((value: any) => {
                if (value.records) {
                    value.records.forEach((record: any) => {
                        record.parentId = entity.id
                        return record
                    })
                }
            })
            return { ...entity }
        },
    }
)
export const entitiesSchema = new schema.Array(entitySchema)
const valuesSchema = new schema.Values({
    records: entitiesSchema,
})
entitySchema.define({ kids: valuesSchema })
