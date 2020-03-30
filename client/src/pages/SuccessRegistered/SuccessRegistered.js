import React, { Component } from 'react';

import styles from './SuccessRegistered.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class SuccessRegistered extends Component {


    componentDidMount(){
        this.props.resetRegisteredStatus();
    }

    render() {
        return (
            <div className={styles.container}>

                <div className={styles.innerContainer}>

                <h1 className={styles.header}>Confirmation Email Sent To Your Inbox</h1> 
                <h3 className={styles.message}>Please confirm your email in order to login</h3> 

                <Link to='/auth/login' className={styles.home}>LOGIN</Link>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetRegisteredStatus: () => dispatch(authActionCreators.resetRegisteredStatus()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessRegistered);