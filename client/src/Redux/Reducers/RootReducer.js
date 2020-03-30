

import {combineReducers} from 'redux';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import articleReducer from './ArticleReducer';


const rootReducer = combineReducers({

    auth: authReducer,
    error: errorReducer,
    article: articleReducer,
});

export default rootReducer;