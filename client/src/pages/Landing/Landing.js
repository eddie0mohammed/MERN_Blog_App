import React, { Component } from 'react';

import styles from './Landing.module.css';

class Landing extends Component {
    render() {
        return (
            <div className={styles.container}>

                <div className={styles.imageContainer}>
                    <img className={styles.img} src="https://source.unsplash.com/wV9lz91ZDDQ" alt="img" />
                    <div className={styles.overlay}></div>
                    
                    <div className={styles.message}>
                        <h1 className={styles.title}>Welcome</h1>
                        <p className={styles.desc}>The purpose of this blog is to document my journey into web development. Feel free to contribute, review and comment on them.</p>

                    </div>
                </div>

                

                <div className={styles.btns}>
                    <div className={styles.login} onClick={() => this.props.history.push('/auth/login')}>Login</div>
                    <div className={styles.register} onClick={() => this.props.history.push('/auth/register')}>Register</div>

                </div>
                
            </div>
        )
    }
}

export default Landing;