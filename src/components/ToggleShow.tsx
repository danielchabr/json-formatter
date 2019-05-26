import React from 'react'
import styles from './ToggleShow.module.scss'

interface Props {
    show: boolean
    onToggle: () => void
}

const ToggleShow: React.FC<Props> = (props) => {
    return (
        <div
            className={`${styles.arrow} 
                                ${
                                    props.show
                                        ? styles.arrowDown
                                        : styles.arrowRight
                                }`}
            onClick={props.onToggle}
        />
    )
}

export default ToggleShow
