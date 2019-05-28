import React, { Fragment, useState } from 'react'
import { Entity } from '../redux/data/types'
import EntityTable from '../containers/EntityTable'
import ToggleShow from './ToggleShow'
import { childrenKey } from '../redux/data/entityUtils'

interface OwnProps {
    entity: Entity
    attributes: string[]
    onRemove: (id: string) => void
}

const EntityItemView: React.FC<OwnProps> = (props) => {
    const hasChildren = Object.values(props.entity[childrenKey] || []).some(
        (value) => value && value.records && value.records.length > 0
    )
    const [showChildren, setShowChildren] = useState(false)

    return (
        <Fragment key={props.entity.id}>
            <tr>
                <td>
                    {hasChildren && (
                        <ToggleShow
                            show={showChildren}
                            onToggle={() => setShowChildren(!showChildren)}
                        />
                    )}
                </td>
                {props.attributes.map((attr) => (
                    <td key={attr}>{props.entity.data[attr]}</td>
                ))}
                <td>
                    <button onClick={() => props.onRemove(props.entity.id)}>
                        Delete
                    </button>
                </td>
            </tr>
            {hasChildren && showChildren && (
                <tr>
                    <td colSpan={props.attributes.length + 2}>
                        {Object.entries(props.entity[childrenKey]).map(
                            ([relation, value]) => (
                                <EntityTable
                                    key={relation}
                                    title={relation}
                                    entityList={value.records}
                                />
                            )
                        )}
                    </td>
                </tr>
            )}
        </Fragment>
    )
}

export default EntityItemView
