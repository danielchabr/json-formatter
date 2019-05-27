import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreShape } from '../redux/store'
import { getRootEntityList } from '../redux/data/selectors'
import EntityTable from './EntityTable'

interface OwnProps {}
interface Props extends OwnProps {
    rootEntityList: string[]
}

const JSONViewer: React.FC<Props> = (props) => (
    <EntityTable entityList={props.rootEntityList} />
)

export default connect(
    (state: StoreShape, props: OwnProps) => ({
        rootEntityList: getRootEntityList(state),
    }),
    (dispatch) => {
        return bindActionCreators({}, dispatch)
    }
)(JSONViewer)
