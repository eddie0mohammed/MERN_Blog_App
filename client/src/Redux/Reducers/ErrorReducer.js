
import * as actionTypes from '../Actions/ActionTypes';


const initialState = {
    error: ''
};

const errorReducer = (state = initialState, action) => {
    
    switch(action.type){

        case (actionTypes.REGISTER_FAIL):
            return {
                ...state,
                error: "Registration failed"
            }

        case (actionTypes.LOGIN_ERROR):
            return {
                ...state,
                error: "Invalid credentials"
            }
        
        

        case (actionTypes.CLEAR_ERRORS):
            return {
                ...state,
                error: ''
            }

        case (actionTypes.ERR):
            return {
                ...state,
                error: 'Error'
            }
        
        case (actionTypes.ERROR_IMG):
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
    }
}

export default errorReducer;