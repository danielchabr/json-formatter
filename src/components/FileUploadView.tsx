import React from 'react'
import styles from './FileUploadView.module.scss'
import { LoadingStateEnum } from '../redux/data/types'

interface Props {
    handleFile: (file: File) => void
    loadingState: LoadingStateEnum
    error?: string
}

const FileUploadView: React.FC<Props> = (props) => {
    if (props.loadingState === LoadingStateEnum.SUCCESS) {
        return <></>
    }

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

            <div>
                {props.loadingState === LoadingStateEnum.IN_PROGRESS &&
                    'Loading data ...'}
            </div>

            <div className={styles.error}>{props.error}</div>
        </div>
    )
}

export default FileUploadView
