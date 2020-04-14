import React, { Component } from 'react';

import styles from './ViewArticle.module.css';

import {connect} from 'react-redux';

import * as articlesActionCreators from '../../../Redux/Actions/ArticlesActionCreators';

class ViewArticle extends Component {

    state = {
        title: '',
        article: '',
        imageURL: '',
        id: '',
        author: '',
        authorId: ''
    }

    componentDidMount(){
        const id = this.props.match.params.articleId;
        if (this.props.articles.length > 0){

            const currentArticle = this.props.articles.filter(elem => elem._id === id)[0];
            // console.log(currentArticle.author);
            this.setState({
                title: currentArticle.title,
                article: currentArticle.article,
                imageURL: currentArticle.imageURL,
                id: id,
                author: currentArticle.author.username,
                authorId: currentArticle.author._id
            });
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.articles !== this.props.articles){
            const id = this.props.match.params.articleId;
            const currentArticle = this.props.articles.filter(elem => elem._id === id)[0];
            // console.log(currentArticle.author);
            this.setState({
                title: currentArticle.title,
                article: currentArticle.article,
                imageURL: currentArticle.imageURL,
                id: id,
                author: currentArticle.author.username,
                authorId: currentArticle.author._id
            });

        }
    }

    handleDelete = async () => {
        await this.props.deleteArticle(this.state.id);

        this.props.history.push('/');
    }

    render() {
        
        return (
            
            <div className={styles.viewArticle}>

                {this.props.isAuthenticated && this.props.user && this.props.user._id === this.state.authorId ?
                    <div className={styles.btns}>
                        <div className={`${styles.btn} ${styles.edit}`} onClick={() => this.props.history.push(`/articles/edit/${this.state.id}`)}>Edit</div>
                        <div className={`${styles.btn} ${styles.delete}`} onClick={this.handleDelete}>Delete</div>
                    </div>
                    :
                    null}

                <div className={styles.article}>
                    <img className={styles.image} src={`http://localhost:8080/images/${this.state.imageURL}`} alt=""/>
                    
                    <div className={styles.authorDetails}>
                        <h1 className={styles.title}>Title:{this.state.title}</h1>
                        <p className={styles.author}>Author: {this.state.author}</p>
                    </div>

                    <p className={styles.paragraph}>
                        {this.state.article}
                    </p>

                </div>

                

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.article.articles,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteArticle: (id) => dispatch(articlesActionCreators.deleteArticle(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);