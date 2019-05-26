import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FileUploadView from '../components/FileUploadView'
import { StoreShape } from '../redux/store'
import { loadFileAsync } from '../redux/data/actions'

interface OwnProps {}
interface Props extends OwnProps {
    loadFile: (file: File) => void
}

const FileUpload = (props: Props) => {
    function handleFile(file: File) {
        console.log(file)
        props.loadFile(file)
    }

    return <FileUploadView handleFile={handleFile} />
}

export default connect(
    (state: StoreShape, props: OwnProps) => ({}),
    (dispatch) => {
        return bindActionCreators(
            {
                loadFile: loadFileAsync,
            },
            dispatch
        )
    }
)(FileUpload)
