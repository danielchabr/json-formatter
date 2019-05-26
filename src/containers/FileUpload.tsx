import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FileUploadView from '../components/FileUploadView'
import { loadFileAsync } from '../redux/data/actions'

interface OwnProps {}
interface Props extends OwnProps {
    loadFile: (file: File) => void
}

const FileUpload = (props: Props) => {
    function handleFile(file: File) {
        props.loadFile(file)
    }

    return <FileUploadView handleFile={handleFile} />
}

export default connect(
    undefined,
    (dispatch) => {
        return bindActionCreators(
            {
                loadFile: loadFileAsync,
            },
            dispatch
        )
    }
)(FileUpload)
