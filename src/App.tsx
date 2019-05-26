import React from 'react'
import { Provider } from 'react-redux'
import './App.scss'
import store from './redux/store'
import FileUpload from './containers/FileUpload'
import JSONViewer from './containers/JSONViewer'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <FileUpload />
            <JSONViewer />
        </Provider>
    )
}

export default App
