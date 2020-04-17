

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


        case (actionTypes.LIKE_ARTICLE):
            const currentArticles1 = [...state.articles];
            const articleIndex = currentArticles1.findIndex(elem => elem._id === action.payload.articleId);
            const currentArticle = currentArticles1[articleIndex];
            currentArticle.likes = [...currentArticle.likes, action.payload.userId];
            currentArticles1[articleIndex] = currentArticle
            return {
                ...state,
                articles: currentArticles1

            }

        case (actionTypes.UNLIKE_ARTICLE):
            const currentArticles2 = [...state.articles];
            const articleIndex1 = currentArticles2.findIndex(elem => elem._id === action.payload.articleId);
            const currentArticle1 = currentArticles2[articleIndex1];
            currentArticle1.likes = currentArticle1.likes.filter(elem => elem !== action.payload.userId);
            currentArticles2[articleIndex1] = currentArticle1;


            return {
                ...state,
                articles: currentArticles2
            }

        case (actionTypes.ADD_COMMENT):
            const article = state.articles.filter(elem => elem._id === action.payload.articleId)[0];
            const arIndex = state.articles.findIndex(elem => elem._id === action.payload.articleId);
            article.comments = action.payload.comments;
            const updatedArticles = [...state.articles];
            updatedArticles[arIndex] = article;


            return {
                ...state,
                articles: updatedArticles

            }

        case (actionTypes.REMOVE_COMMENT):
            const article1 = state.articles.filter(elem => elem._id === action.payload.articleId)[0];
            const arIndex1 = state.articles.findIndex(elem => elem._id === action.payload.articleId);
            article1.comments = action.payload.comments;
            const updatedArticles1 = [...state.articles];
            updatedArticles1[arIndex1] = article1;
            
            return {
                ...state,
                articles: updatedArticles1
            }

        default:
            return state;
    }
}

export default articleReducer;