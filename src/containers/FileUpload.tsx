import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FileUploadView from '../components/FileUploadView'
import { loadFileAsync } from '../redux/data/actions'
import { getLoadingStatus } from '../redux/data/selectors'
import { StoreShape } from '../redux/store'
import { LoadingStateEnum } from '../redux/data/types'

interface OwnProps {}
interface Props extends OwnProps {
    loadFile: (file: File) => void
    loadingState: LoadingStateEnum
    error?: string
}

const FileUpload: React.FC<Props> = (props) => (
    <FileUploadView
        handleFile={props.loadFile}
        loadingState={props.loadingState}
        error={props.error}
    />
)

export default connect(
    (state: StoreShape) => ({
        loadingState: getLoadingStatus(state).state,
        error: getLoadingStatus(state).error,
    }),
    (dispatch) => {
        return bindActionCreators(
            {
                loadFile: loadFileAsync,
            },
            dispatch
        )
    }
)(FileUpload)
