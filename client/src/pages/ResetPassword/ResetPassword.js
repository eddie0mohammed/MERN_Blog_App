
import React, { Component } from 'react'

import styles from './ResetPassword.module.css';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Error from '../../components/ErrorComponent/ErrorComponent';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';


const validationSchema = Yup.object().shape({
   
    password: Yup.string()
                    .min(8, 'Password is too short - should be 8 chars minimum.')
                    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])/, 'Password must contain at least one Uppercase letter, one digit and a special character')
                    .required('Password required'),
    confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
                    .required('Confirm Password')
});

class ResetPassword extends Component {


    handleSubmitForm = async (password, confirmPassword) => {

        // console.log(this.state);
        if (password === confirmPassword){
            const token = this.props.match.params.token;
    
            await this.props.resetPassword(password, token);
        }

        if (this.props.passwordChanged){
            this.props.history.push('/auth/login');
        }        
    }

    
    render() {
        
        return (
            <div className={styles.register}>

                <Formik
                    initialValues = {{
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={validationSchema}

                    onSubmit={ (values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        
                        //form submitted => what actions to take
                        this.handleSubmitForm(values.password, values.confirmPassword);
                        
                        resetForm();
                        setSubmitting(false);
                    }}
                    
                >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    
                        <form className={styles.form} onSubmit={handleSubmit}>

                            <h1 className={styles.heading}>Reset Password</h1>    
                            
                            <input className={`${styles.input} ${touched.password && errors.password ? `${styles.error}` : '' }`} type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete="off"/>
                            <Error touched={touched.password} message={errors.password}/>
                            
                            <input className={`${styles.input} ${touched.confirmPassword && errors.confirmPassword ? `${styles.error}` : '' }`} type="password" name="confirmPassword" placeholder="Confirm Password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} autoComplete="off"/>
                            <Error touched={touched.confirmPassword} message={errors.confirmPassword}/>

                            <input className={styles.submit} type="submit" value="Submit" disabled={isSubmitting}/>

                        </form>

                )}
                </Formik>

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