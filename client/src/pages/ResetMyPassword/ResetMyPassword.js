
import React, { Component } from 'react'

import styles from './ResetMyPassword.module.css';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';


class ResetMyPassword extends Component {

    state = {
        currentPassword: '',
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
        if (this.state.currentPassword && this.state.password === this.state.confirmPassword){
            await this.props.resetMyPassword(this.state.currentPassword, this.state.password)
            if (this.props.myPasswordChanged){
                this.props.history.push('/auth/settings');
            }
            

        }


        
    }

    checkSubmitBtn = () => {
        let check = true;
        if (this.state.password === this.state.confirmPassword && this.state.password && this.state.currentPassword){
            check = false;
        }
        return check;
    }
    
    render() {
        
        return (
            <div className={styles.register}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Reset Password</h1>    

                    
                    <input className={styles.input} type="password" name="currentPassword" placeholder="Current Password" value={this.state.currentPassword} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="password" name="password" placeholder="New Password" value={this.state.password} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="password" name="confirmPassword" placeholder="Confirm New Password" value={this.state.confirmPassword} onChange={this.handleInputChange}/>


                    <p style={{textAlign: 'center', color: 'red'}}>{this.props.error}</p>
                    <input className={styles.submit} type="submit" value="Submit" disabled={this.checkSubmitBtn()}/>

                </form>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        passwordChanged: state.auth.passwordChanged,
        error: state.error.error,
        myPasswordChanged: state.auth.myPasswordChanged
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetMyPassword: (currentPassword, password) => dispatch(authActionCreators.resetMyPassword(currentPassword, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetMyPassword);