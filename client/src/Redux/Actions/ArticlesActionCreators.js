
import axios from 'axios';

import * as actionTypes from '../Actions/ActionTypes';


export const addArticle = (title, article, file) => async (dispatch, getState) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getState().auth.token
            }
        }
        // const body = JSON.stringify({title, article, imageURL});
        const formData = new FormData();
        formData.append('image', file, file.filename);
        formData.append("title", title);
        formData.append("article", article);

        // const res = await axios.post('http://localhost:8080/articles', body, config);
        const res = await axios.post('http://localhost:8080/articles', formData, config);
        // const res = await axios.post('/articles', formData, config);
        // console.log(res.data);
        dispatch({
            type: actionTypes.ADD_ARTICLE,
            payload: res.data.data.article
        });

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
    }

}

export const deleteArticle = (id) => async (dispatch, getState) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getState().auth.token
            }
        }
        
        // await axios.delete(`/articles/${id}`);
        await axios.delete(`http://localhost:8080/articles/${id}`, config);

        dispatch({
            type: actionTypes.DELETE_ARTICLE,
            payload: id
        });

    }catch(err){
        console.log(err.response);
    }
    
}

export const updateArticle = (id, title, article, file) => async (dispatch, getState) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": getState().auth.token
            }
        }

        // const body = JSON.stringify({
        //     title: title,
        //     article: article,
        //     imageURL: imageURL
        // });
        const formData = new FormData();
        formData.append('title', title);
        formData.append('article', article);
        if (file){
            formData.append('image', file, file.name);
        }

        // await axios.patch(`http://localhost:8080/articles/${id}`, body, config);
        const res = await axios.patch(`http://localhost:8080/articles/${id}`, formData, config);
        // const res = await axios.patch(`/articles/${id}`, formData, config);
        // console.log(res.data);
        dispatch({
            type: actionTypes.UPDATE_ARTICLE,
            payload: {
                id: id,
                title: title,
                article: article,
                imageURL: res.data.data.article.imageURL
            }
        });

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
    }

}

export const getArticles = () => async (dispatch) => {


    try{

        const res = await axios.get('http://localhost:8080/articles');
        // const res = await axios.get('/articles');
        // console.log(res.data);

        dispatch({
            type: actionTypes.GET_ARTICLES,
            payload: res.data
        });

        

    }catch(err){
        console.log(err);

    }
}


export const likeArticle = (articleId) => async (dispatch, getState) => {

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

        const body = JSON.stringify({})

        await axios.patch(`http://localhost:8080/articles/like/${articleId}`, body, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.LIKE_ARTICLE,
            payload: {
                userId: getState().auth.user._id,
                articleId: articleId
            }
        });

        return {
            status: 'success'
        }


    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERR,
            payload: err.response.data.error.message
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            });
        }, 3000);

    }
}


export const unlikeArticle = (articleId) => async (dispatch, getState) => {

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

        const body = JSON.stringify({});

        await axios.patch(`http://localhost:8080/articles/unlike/${articleId}`, body, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.UNLIKE_ARTICLE,
            payload: {
                userId: getState().auth.user._id,
                articleId: articleId
            }
        });

        return {
            status: 'success'
        }



    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERR,
            payload: err.response.data.error.message
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            });
        }, 3000);
    }
}


export const addComment = (comment, articleId, username) => async (dispatch, getState) => {

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

        const body = JSON.stringify({comment, username});

        const res = await axios.patch(`http://localhost:8080/articles/add-comment/${articleId}`, body, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.ADD_COMMENT,
            payload: {
                comments: res.data.data.article.comments,
                articleId: articleId
            }
        });

        return {
            status: 'success'
        }

    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERR,
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


export const removeComment = (key, articleId) => async (dispatch, getState) => {

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

        const body = JSON.stringify({key: key});

        const res = await axios.patch(`http://localhost:8080/articles/remove-comment/${articleId}`, body, config );
        // console.log(res.data);

        dispatch({
            type: actionTypes.REMOVE_COMMENT,
            payload: {
                comments: res.data.data.article.comments,
                articleId: articleId
            }
        });

        return {
            status: 'success'
        }



    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERR,
            // payload: err.response.data.error.message
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