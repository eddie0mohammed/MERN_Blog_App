import React from 'react';

import styles from './ErrorComponent.module.css';


const Error = ({touched, message}) => {

    if (!touched ){
        return (
            <div className={`${styles.formMessage} ${styles.invalid}`}>&nbsp;</div>
        )
    }

    if (message){
        return (
            <div className={`${styles.formMessage} ${styles.invalid}`}>{message}</div>
        )

    }

    return (
            <div className={`${styles.formMessage} ${styles.invalid}`}></div>
    )
}

export default Error;