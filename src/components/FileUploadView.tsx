import React from 'react'
import styles from './FileUploadView.module.scss'
import { LoadingStateEnum } from '../redux/data/reducer'

interface Props {
    handleFile: (file: File) => void
}

const FileUploadView: React.FC<Props> = (props) => {
    function handleUpload(fileList: FileList) {
        if (fileList.length === 1) {
            props.handleFile(fileList[0])
        }
    }

    return (
        <div className={styles.fileUpload}>
            <h1>Upload your JSON file:</h1>

            <input
                type="file"
                required={true}
                placeholder=""
                multiple={false}
                onChange={(e: any) => {
                    handleUpload(e.target.files)
                }}
            />
        </div>
    )
}

export default FileUploadView
