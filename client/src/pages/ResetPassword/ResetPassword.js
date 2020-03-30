
import React, { Component } from 'react'

import styles from './ResetPassword.module.css';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';


class ResetPassword extends Component {

    state = {
        password: '',
        confirmPassword: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(this.state);
        if (this.state.password === this.state.confirmPassword){
            const token = this.props.match.params.token;
    
            await this.props.resetPassword(this.state.password, token);
        }

        if (this.props.passwordChanged){
            this.props.history.push('/auth/login');
        }

        
    }

    checkSubmitBtn = () => {
        let check = true;
        if (this.state.password === this.state.confirmPassword && this.state.password){
            check = false;
        }
        return check;
    }
    
    render() {
        
        return (
            <div className={styles.register}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Reset Password</h1>    

                    
                    <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleInputChange}/>

                    <input className={styles.submit} type="submit" value="Submit" disabled={this.checkSubmitBtn()}/>

                </form>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        passwordChanged: state.auth.passwordChanged
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (password, token) => dispatch(authActionCreators.resetPassword(password, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);