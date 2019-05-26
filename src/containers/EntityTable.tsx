import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreShape } from '../redux/store'
import { Entity } from '../redux/data/reducer'
import { getEntities, getEntitiesAttributes } from '../redux/data/selectors'
import EntityItem from './EntityItem'

interface OwnProps {
    title?: string
    entityList: string[]
}
interface Props extends OwnProps {
    entities: Entity[]
    attributes: string[]
}

const EntityTable: React.FC<Props> = (props) => {
    return (
        <table className="pure-table pure-table-bordered">
            <thead>
                {props.title && (
                    <tr>
                        <th colSpan={props.attributes.length}>{props.title}</th>
                    </tr>
                )}
                <tr>
                    {props.attributes.map((attr) => (
                        <th key={attr}>{attr}</th>
                    ))}
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

export default connect(
    (state: StoreShape, props: OwnProps) => ({
        entities: getEntities(state, props.entityList),
        attributes: getEntitiesAttributes(state, props.entityList),
    }),
    (dispatch) => {
        return bindActionCreators({}, dispatch)
    }
)(EntityTable)
