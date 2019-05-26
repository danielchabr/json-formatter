import React, { Fragment } from 'react'
import { Entity } from '../redux/data/reducer'
import EntityTable from './EntityTable'

interface OwnProps {
    entity: Entity
    attributes: string[]
}

const EntityItem: React.FC<OwnProps> = ({ entity, attributes }) => {
    return (
        <Fragment key={entity.id}>
            <tr>
                {attributes.map((attr) => (
                    <td key={attr}>{entity.data[attr]}</td>
                ))}
            </tr>
            {Object.keys(entity.kids).length > 0 && (
                <tr>
                    <th colSpan={attributes.length}>
                        {Object.keys(entity.kids).map((relation) => (
                            <EntityTable
                                key={relation}
                                title={relation}
                                entityList={entity.kids[relation].records}
                            />
                        ))}
                    </th>
                </tr>
            )}
        </Fragment>
    )
}

export default EntityItem
