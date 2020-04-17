
import React, { Component } from 'react'

import styles from './ForgotPassword.module.css';

import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Error from '../../components/ErrorComponent/ErrorComponent';
import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';


const validationSchema = Yup.object().shape({
   
    email: Yup.string()
                    .email('Must be a valid email address')
                    .required('Email required')
});


class ForgotPassword extends Component {

    // state = {
    //     email: ''
    // }

    // handleInputChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    handleSubmitForm = async (email) => {

        // console.log(this.state);
        await this.props.forgotPassword(email);

        if (this.props.forgotPassword){
            this.props.history.push('/auth/confirmForgotPassword');
        }


    }
    
    render() {
        
        return (
            <div className={styles.register}>

                {/* <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Forgot Your Password</h1>    

                    <p className={styles.message}>Enter your email. A password reset link will be sent to your inbox</p>

                    <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} autoComplete="off"/>
                    
                    <input className={styles.submit} type="submit" value="Submit"/>

                </form>                 */ }
                <Formik
                    initialValues = {{
                        email: ''
                    }}
                    validationSchema={validationSchema}

                    onSubmit={ (values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        
                        //form submitted => what actions to take
                        this.handleSubmitForm(values.email)
    
                        resetForm();
                        setSubmitting(false);
                    }}
                    
                >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    
                    <form className={styles.form} onSubmit={handleSubmit}>

                        <h1 className={styles.heading}>Forgot Your Password</h1>    

                        <p className={styles.message}>Enter your email. A password reset link will be sent to your inbox</p>

                        <input className={`${styles.input} ${touched.email && errors.email ? `${styles.error}` : '' }`} type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} autoComplete="off"/>
                        <Error touched={touched.email} message={errors.email}/>
                        
                        <input className={styles.submit} type="submit" value="Submit" disabled={isSubmitting}/>

                    </form>

                )}
                </Formik>
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