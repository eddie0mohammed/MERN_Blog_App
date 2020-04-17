import React, { Component } from 'react'

import styles from './Home.module.css';

import List from '../Articles/List/List';

class Home extends Component {
    render() {
        return (
            <div className={styles.home}>
                <h1 className={styles.header}>Articles</h1>
                <List />
            </div>
        )
    }
}

export default Home