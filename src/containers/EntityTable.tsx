import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreShape } from '../redux/store'
import { Entity } from '../redux/data/types'
import { getEntities, getEntitiesAttributes } from '../redux/data/selectors'
import EntityTableView from '../components/EntityTableView'

interface OwnProps {
    title?: string
    entityList: string[]
}
interface Props extends OwnProps {
    entities: Entity[]
    attributes: string[]
}

const EntityTable: React.FC<Props> = (props) => (
    <EntityTableView
        title={props.title}
        entities={props.entities}
        attributes={props.attributes}
    />
)

export default connect(
    (state: StoreShape, props: OwnProps) => ({
        entities: getEntities(state, props.entityList),
        attributes: getEntitiesAttributes(state, props.entityList),
    }),
    (dispatch) => {
        return bindActionCreators({}, dispatch)
    }
)(EntityTable)
