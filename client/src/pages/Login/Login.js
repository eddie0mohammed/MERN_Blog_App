
import React, { Component } from 'react'

import styles from './Login.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Error from '../../components/ErrorComponent/ErrorComponent';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';


const validationSchema = Yup.object().shape({
    email: Yup.string()
                    .email('Must be a valid email address')
                    .required('Email required'),
    password: Yup.string()
                    // .min(8, 'Password is too short - should be 8 chars minimum.')
                    // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
                    .required('Password required')
});


class Login extends Component {
    
    componentDidMount(){
        this.props.resetPasswordChangedStatus();
    }


    handleSubmitForm = async (email, password) => {

        // console.log(this.state);
        await this.props.login(email, password);

        if (this.props.isAuthenticated){
            this.props.history.push('/');
        }
    }

    
    render() {
        
        return (
            <div className={styles.register}>

                <Formik
                    initialValues = {{
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}

                    onSubmit={ (values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        
                        //form submitted => what actions to take
                        this.handleSubmitForm(values.email, values.password)
    
                        // resetForm();
                        setSubmitting(false);
                    }}
                    
                >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (

                        <form className={styles.form} onSubmit={handleSubmit}>

                            <h1 className={styles.heading}>Login</h1>    

    
                            <input className={`${styles.input} ${touched.email && errors.email ? `${styles.error}` : '' }`} type="email" name="email" placeholder="Email" onChange={handleChange} onBlur={handleBlur} value={values.email} autoComplete="off"/>
                            <Error touched={touched.email} message={errors.email}/>

                            <input className={`${styles.input} ${touched.password && errors.password ? `${styles.error}` : '' }`} type="password" name="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password} autoComplete="off"/>
                            <Error touched={touched.password} message={errors.password}/>

                            {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null }

                            <input className={styles.submit} type="submit" value="Submit" disabled={isSubmitting}/>

                            <Link to='/auth/forgotPassword' className={styles.link}>Forgot your password?</Link>
                        </form>

                )}
                </Formik>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error,
        isAuthenticated: state.auth.isAuthenticated,
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(authActionCreators.login(email, password)),
        resetPasswordChangedStatus: () => dispatch(authActionCreators.resetPasswordChangedStatus()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);