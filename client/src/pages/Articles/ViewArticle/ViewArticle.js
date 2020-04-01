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

    handleDelete = async () => {
        await this.props.deleteArticle(this.state.id);

        this.props.history.push('/');
    }

    render() {
        
        return (
            
            <div className={styles.viewArticle}>

                <div className={styles.article}>
                    <h1 className={styles.title}>{this.state.title}</h1>

                    <img className={styles.image} src={`http://localhost:8080/images/${this.state.imageURL}`} alt=""/>

                    <p className={styles.paragraph}>{this.state.author}</p>
                    <p className={styles.paragraph}>
                        {this.state.article}
                    </p>

                </div>

                {this.props.isAuthenticated && this.props.user._id === this.state.authorId ?
                    <div className={styles.btns}>
                        <div className={`${styles.btn} ${styles.edit}`} onClick={() => this.props.history.push(`/articles/edit/${this.state.id}`)}>Edit</div>
                        <div className={`${styles.btn} ${styles.delete}`} onClick={this.handleDelete}>Delete</div>
                    </div>
                    :
                    null}

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