
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

        // const res = await axios.post('http://localhost:8080/auth/register', body, config);
        const res = await axios.post('/auth/register', body, config);
        // console.log(res.data);
        
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data
        });


    }catch(err){
        // console.log(err.response);
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            payload: err.response.data.error.message
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

        // const res = await axios.post('http://localhost:8080/auth/login', body, config);
        const res = await axios.post('/auth/login', body, config);
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


export const getUser = () => async (dispatch, getState) => {

    try{
        const token = getState().auth.token;
        
        if (!token){
            return {
                status: 'fail'
            }
        }
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        };
        

        const res = await axios.get('/auth/user', config);
        // const res = await axios.get('http://localhost:8080/auth/user', config);
        // console.log(res.data);
        dispatch({
            type: actionTypes.GET_USER,
            payload: res.data
        });

        return {
            status: 'success'
        }

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

        return {
            status: 'fail'
        }
        
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

        // const res = await axios.post('http://localhost:8080/auth/forgotPassword', body, config);
        const res = await axios.post('/auth/forgotPassword', body, config);

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

        // const res = await axios.post(`http://localhost:8080/auth/resetPassword/${token}`, body, config);
        const res = await axios.post(`/auth/resetPassword/${token}`, body, config);
        
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


export const resetMyPassword = (currentPassword, newPassword) => async (dispatch, getState) => {

    try{
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                "auth-token": getState().auth.token
            }
        }

         //body
         const body = JSON.stringify({currentPassword: currentPassword, newPassword: newPassword});

        //  const res = await axios.post(`http://localhost:8080/auth/resetMyPassword`, body, config);
        await axios.post(`/auth/resetMyPassword`, body, config);
        //  console.log(res.data);
        
         dispatch({
             type: actionTypes.RESET_MY_PASSWORD
         });

         return {
             status: 'success'
         }



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

        return {
            status: 'fail'
        }
    }

    
}

export const resetMyPasswordStatus = () => {
    return {
        type: actionTypes.RESET_MY_PASSWORD_STATUS
    }
}


export const changePicture = (picture) => async (dispatch, getState) => {

    try{
        const token = getState().auth.token;
        if (!token){
            return {
                status: 'fail'
            }
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        }

        const formData = new FormData();
        if (picture){
            formData.append('profilePic', picture, picture.filename);
        }

        // const res = await axios.patch(`http://localhost:8080/auth/changePicture`, formData, config);
        const res = await axios.patch(`/auth/changePicture`, formData, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.CHANGE_PICTURE,
            payload: res.data.data.user
        });

        return {
            status: 'success'
        }
        

    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERROR_IMG,
            payload: err.response.data.error.message
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            });
        }, 3000);

        return {
            status: 'fail'
        }
    }
}