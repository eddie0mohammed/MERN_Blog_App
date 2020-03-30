
import React, { Component } from 'react'

import styles from './Register.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';


class Register extends Component {

    state = {
        username: '',
        email: '',
        password: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await this.props.register(this.state.username, this.state.email, this.state.password);
        if (this.props.registerSuccess){
            this.props.history.push('/auth/confirmEmail');
        }
    }

    checkSubmitBtn = () => {
        let check = true;
        if (!this.state.email || !this.state.password || !this.state.username){
            check = false;
        }
        return check;
    }
    
    render() {
        
        return (
            <div className={styles.register}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Register</h1>    

                    <input className={styles.input} type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>


                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null }
                    <input className={styles.submit} type="submit" value="Submit" disabled={!this.checkSubmitBtn()}/>

                    <Link to="/auth/login" className={styles.link}>Already have an account? Login</Link>
                </form>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        registerSuccess: state.auth.registerSuccess,
        error: state.error.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (username, email, password) => dispatch(authActionCreators.register(username, email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);