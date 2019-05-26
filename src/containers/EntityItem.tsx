import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EntityItemView from '../components/EntityItemView'
import { removeEntity } from '../redux/data/actions'
import { Entity } from '../redux/data/types'

interface OwnProps {
    entity: Entity
    attributes: string[]
}
interface Props extends OwnProps {
    removeEntity: (id: string) => void
}

const EntityItem: React.FC<Props> = (props) => (
    <EntityItemView
        entity={props.entity}
        attributes={props.attributes}
        onRemove={props.removeEntity}
    />
)

export default connect(
    undefined,
    (dispatch) => {
        return bindActionCreators(
            {
                removeEntity,
            },
            dispatch
        )
    }
)(EntityItem)
