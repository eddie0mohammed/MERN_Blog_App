import React from 'react'

import styles from './Overlay.module.css';

const Overlay = (props) => {
    return (
        <div className={styles.overlay} style={{display: `${props.sidebarOpen ? 'block' : 'none'}`}} onClick={props.toggleSidebar}>
            
        </div>
    )
}

export default Overlay;