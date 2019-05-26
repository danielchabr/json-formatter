import React from 'react'

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
        <input
            type="file"
            required={true}
            placeholder=""
            multiple={false}
            onChange={(e: any) => {
                handleUpload(e.target.files)
            }}
        />
    )
}

export default FileUploadView
