import React, { Component } from 'react';

import styles from './Settings.module.css';

import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';


class Settings extends Component {

    renderComponent = () => {
        return this.props.user ? 
        (
            <div className={styles.settings}>

                <h1 className={styles.header}>Settings</h1>

                <div className={styles.container}>

                    <input className={styles.input} type="text" name="username" value={this.props.user.username} disabled/>
                    <input className={styles.input} type="email" name="email"  value={this.props.user.email} disabled/>
                    <input className={styles.input} type="text" name="date" value={this.props.user.createdAt.toLocaleString().split('T')[0]} disabled />


                    <div className={styles.changeContainer}>
                        <p className={styles.changePassword}>Change Password</p>                        
                        <Link className={styles.link} to={`/auth/resetMyPassword`}>Click here</Link>
                    </div>
                </div>
                
            </div>

        )
        :

        <h1 className={styles.loading}>Loading...</h1>
    }

    render() {
        
        return (
            <div>{this.renderComponent()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetMyPasswordStatus: () => dispatch(authActionCreators.resetMyPasswordStatus)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);