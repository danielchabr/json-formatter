import React, { Fragment, useState } from 'react'
import { Entity } from '../redux/data/reducer'
import EntityTable from '../containers/EntityTable'
import ToggleShow from './ToggleShow'

interface OwnProps {
    entity: Entity
    attributes: string[]
    onRemove: (id: string) => void
}

const EntityItemView: React.FC<OwnProps> = (props) => {
    const hasChildren = Object.keys(props.entity.kids).length > 0
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
                        {Object.keys(props.entity.kids).map((relation) => (
                            <EntityTable
                                key={relation}
                                title={relation}
                                entityList={props.entity.kids[relation].records}
                            />
                        ))}
                    </td>
                </tr>
            )}
        </Fragment>
    )
}

export default EntityItemView
