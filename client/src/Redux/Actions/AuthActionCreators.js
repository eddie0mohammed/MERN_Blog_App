
import * as actionTypes from './ActionTypes';
import axios from 'axios';


export const register = (username, email, password) => async (dispatch) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = {username, email, password};

        const res = await axios.post('http://localhost:8080/auth/register', body, config);
        // console.log(res.data);
        
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data
        });


    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.REGISTER_FAIL
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            });
        }, 3000);
    }
}

export const resetRegisteredStatus = () => {
    return {
        type: actionTypes.RESET_REGISTERED_STATUS
    }
}



export const login = (email, password) => async (dispatch) => {

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = {email, password};

        const res = await axios.post('http://localhost:8080/auth/login', body, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: res.data
        });

        
    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.LOGIN_ERROR
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            });
        }, 3000);
    }
}


export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}


export const getUser = (token) => async (dispatch) => {

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (token){
            config.headers['auth-token'] = token;
        }

        const res = await axios.get('http://localhost:8080/auth/user', config);
        console.log(res.data);
        dispatch({
            type: actionTypes.GET_USER,
            payload: res.data
        });

    }catch(err){
        console.log(err);
        dispatch({
            type:actionTypes.GET_USER_FAIL
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            });
        }, 3000);
        
    }
}


export const forgotPassword = (email) => async (dispatch) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({email: email});

        const res = await axios.post('http://localhost:8080/auth/forgotPassword', body, config);

        dispatch({
            type: actionTypes.FORGOT_PASSWORD,
            payload: res.data
        });

    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERR
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            });
        }, 3000);

    }
}

export const resetForgotStatus = () => {
    return {
        type: actionTypes.RESET_FORGOT_STATUS
    }
}


export const resetPassword = (password, token) => async (dispatch) => {

    try{
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

         //body
         const body = JSON.stringify({password: password});

        const res = await axios.post(`http://localhost:8080/auth/resetPassword/${token}`, body, config);
        
        dispatch({
            type: actionTypes.PASSWORD_CHANGED,
            payload: res.data
        });


    }catch(err){
        console.log(err);
        console.log(err.response);
    }
} 

export const resetPasswordChangedStatus = () => {
    return {
        type: actionTypes.RESET_PASSWORD_CHANGED_STATUS
    }
}