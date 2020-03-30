

import * as actionTypes from '../Actions/ActionTypes';


const initialState = {

    articles: []
}

const articleReducer = (state = initialState, action) => {

    switch(action.type){

        case (actionTypes.ADD_ARTICLE):
            return {
                ...state,
                articles: [...state.articles, {...action.payload}]
            }

        case (actionTypes.DELETE_ARTICLE):
            const filteredArticles = state.articles.filter(elem => elem._id !== action.payload);
            return {
                ...state,
                articles: filteredArticles                
            }

        case (actionTypes.UPDATE_ARTICLE):
            const currentArticles = [...state.articles];
            const index = state.articles.findIndex(elem => elem._id === action.payload.id);
            currentArticles[index].title = action.payload.title;
            currentArticles[index].article = action.payload.article;
            if (action.payload.imageURL){

                currentArticles[index].imageURL = action.payload.imageURL;
            }
                        
            return {
                ...state,
                articles: currentArticles
            }

        case (actionTypes.GET_ARTICLES):
            return {
                ...state,
                articles: action.payload.data.articles
            }

        default:
            return state;
    }
}

export default articleReducer;