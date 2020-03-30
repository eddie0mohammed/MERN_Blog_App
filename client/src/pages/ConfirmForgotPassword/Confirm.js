import React, { Component } from 'react';

import styles from './Confirm.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class Confirm extends Component {


    componentDidMount(){
        this.props.resetForgotStatus();
    }

    render() {
        return (
            <div className={styles.container}>

                <div className={styles.innerContainer}>

                <h1 className={styles.header}>Password Reset Link Sent To Your Inbox</h1> 
                <h3 className={styles.message}>Please use the link provided to reset your password</h3> 

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
        resetForgotStatus: () => dispatch(authActionCreators.resetForgotStatus()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);