

import * as actionTypes from '../Actions/ActionTypes';


const initialState = {
    registerSuccess: false,
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: null,
    forgotPassword: false,
    passwordChanged: false


}


const authReducer = (state = initialState, action) => {

    switch(action.type){

        case (actionTypes.REGISTER_SUCCESS):
            return {
                ...state,
                registerSuccess: true
            }

        case (actionTypes.RESET_REGISTERED_STATUS):
            return {
                ...state,
                registerSuccess: false
            }

        case (actionTypes.LOGIN_SUCCESS):
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.data.user

            }

        case (actionTypes.GET_USER):
            return {
                ...state,
                user: action.payload.data.user
            }
        
        
        case (actionTypes.FORGOT_PASSWORD):
            return {
                ...state,
                forgotPassword: true
            }
        
        case (actionTypes.RESET_FORGOT_STATUS):
            return{
                ...state,
                forgotPassword: false
            }

        case (actionTypes.PASSWORD_CHANGED):
            return {
                ...state,
                passwordChanged: true
            }

        case (actionTypes.RESET_PASSWORD_CHANGED_STATUS):
            return {
                ...state,
                passwordChanged: false
            }
        
        case (actionTypes.LOGOUT):
            localStorage.removeItem("token");
            return{
                ...state,
                isAuthenticated: false,
                token: null,
                user: null
            }

        default:
            return state
    }
}

export default authReducer;