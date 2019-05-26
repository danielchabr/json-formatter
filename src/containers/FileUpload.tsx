import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FileUploadView from '../components/FileUploadView'
import { loadFileAsync } from '../redux/data/actions'
import { getLoadingStatus } from '../redux/data/selectors'
import { StoreShape } from '../redux/store'
import { LoadingStateEnum } from '../redux/data/reducer'

interface OwnProps {}
interface Props extends OwnProps {
    loadFile: (file: File) => void
    loadingState: LoadingStateEnum
    error?: string
}

const FileUpload = (props: Props) => {
    function handleFile(file: File) {
        props.loadFile(file)
    }

    return (
        <FileUploadView
            handleFile={handleFile}
            loadingState={props.loadingState}
            error={props.error}
        />
    )
}

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
