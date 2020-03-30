
import React, { Component } from 'react'

import styles from './ForgotPassword.module.css';

import {connect} from 'react-redux';
import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class ForgotPassword extends Component {

    state = {
        email: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(this.state);
        await this.props.forgotPassword(this.state.email);

        if (this.props.forgotPassword){
            this.props.history.push('/auth/confirmForgotPassword');
        }


    }
    
    render() {
        
        return (
            <div className={styles.register}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Forgot Your Password</h1>    

                    <p className={styles.message}>Enter your email. A password reset link will be sent to your inbox</p>

                    <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                    
                    <input className={styles.submit} type="submit" value="Submit"/>

                </form>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        forgotPassword: state.auth.forgotPassword,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => dispatch(authActionCreators.forgotPassword(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);