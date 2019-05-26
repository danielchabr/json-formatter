import React from 'react'
import { Entity } from '../redux/data/types'
import EntityItem from '../containers/EntityItem'
import styles from './EntityTableView.module.scss'

interface OwnProps {
    title?: string
    entities: Entity[]
    attributes: string[]
}

const EntityTableView: React.FC<OwnProps> = (props) => {
    if (props.entities.length === 0) {
        return <></>
    }

    return (
        <table
            className={'pure-table pure-table-bordered ' + styles.entityTable}
        >
            <thead>
                {props.title && (
                    <tr>
                        <th
                            className={styles.title}
                            colSpan={props.attributes.length + 2}
                        >
                            {props.title}
                        </th>
                    </tr>
                )}
                <tr>
                    <th />
                    {props.attributes.map((attr) => (
                        <th key={attr}>{attr}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.entities.map((entity) => (
                    <EntityItem
                        key={entity.id}
                        entity={entity}
                        attributes={props.attributes}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default EntityTableView
