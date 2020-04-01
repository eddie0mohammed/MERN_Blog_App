
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