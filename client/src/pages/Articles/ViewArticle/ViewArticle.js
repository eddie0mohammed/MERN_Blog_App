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
        authorId: '',
        currentArticle: '',
        textarea: ''
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
                authorId: currentArticle.author._id,
                currentArticle: currentArticle
            });
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.articles !== this.props.articles){
            const id = this.props.match.params.articleId;
            const currentArticle = this.props.articles.filter(elem => elem._id === id)[0];
            // console.log(currentArticle.author);
            if (currentArticle){
                this.setState({
                    title: currentArticle.title,
                    article: currentArticle.article,
                    imageURL: currentArticle.imageURL,
                    id: id,
                    author: currentArticle.author.username,
                    authorId: currentArticle.author._id,
                    currentArticle: currentArticle
                });

            }

        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDelete = async () => {
        await this.props.deleteArticle(this.state.id);

        this.props.history.push('/');
    }

    handleLike = async () => {
        await this.props.likeArticle(this.props.match.params.articleId);
        
    }

    handleUnlike = async () => {
        await this.props.unlikeArticle(this.props.match.params.articleId);
    }


    renderButtons = () => {
        if (this.props.isAuthenticated){
            if (this.props.user._id === this.state.authorId){
                return (
                    <div className={styles.btns}>
                        <div className={`${styles.btn} ${styles.edit}`} onClick={() => this.props.history.push(`/articles/edit/${this.state.id}`)}>Edit</div>
                        <div className={`${styles.btn} ${styles.delete}`} onClick={this.handleDelete}>Delete</div>
                    </div>
                )
            }else{
                if (!this.state.currentArticle.likes.includes(this.props.user._id)){
                    return (
                            <div className={styles.likeBtnContainer}>
                                <div className={styles.likeBtn} onClick={this.handleLike} >Like</div>
                            </div>
                    )
                }else{
                    return(
                        <div className={styles.likeBtnContainer}>
                            <div className={styles.likeBtn} onClick={this.handleUnlike} >Unlike</div>
                        </div>
                    )
                }
            }
        }
    }

    renderComments = () => {
        if (this.state.currentArticle){
            return this.state.currentArticle.comments.map((elem, i) => {
                return (
                    <div key={i} className={styles.comment}>
                        <h2 className={styles.name}>Author: {elem.username}</h2>
                        <p className={styles.commentDesc}>{elem.comment}</p>

                        {this.props.user && this.props.user._id === elem.authorId &&
                            <div className={styles.deleteComment} onClick={() => this.handleRemoveComment(i)}>delete</div>
                        }
                    </div>

                )
            })
        }  
    }

    handleCommentSubmit = async (e) => {
        e.preventDefault();
        const res = await this.props.addComment(this.state.textarea, this.props.match.params.articleId, this.props.user.username);
        
        if (res.status === 'success'){
            this.setState({
                textarea: ''
            });
        }
        
    }

    handleRemoveComment = async (key) => {

        await this.props.removeComment(key, this.props.match.params.articleId);

    }

    checkCommentSubmitBtn = () => {
        let disabled = true;
        if (this.state.textarea){
            disabled = false;
        }
        return disabled;
    }

    render() {
        return this.state.currentArticle ? 
         (
            
            <div className={styles.viewArticle}>

                

                <div className={styles.article}>
                    <img className={styles.image} src={`/images/${this.state.imageURL}`} alt=""/>

                    {/* {this.props.isAuthenticated && this.props.user && this.props.user._id === this.state.authorId ?
                    <div className={styles.btns}>
                        <div className={`${styles.btn} ${styles.edit}`} onClick={() => this.props.history.push(`/articles/edit/${this.state.id}`)}>Edit</div>
                        <div className={`${styles.btn} ${styles.delete}`} onClick={this.handleDelete}>Delete</div>
                    </div>
                    :
                        this.props.isAuthenticated && this.props.user && this.props.user._id !== this.state.authorId ?

                        <div className={styles.likeBtnContainer}>
                            <div className={styles.likeBtn} onClick={() => this.props.likeArticle}>Like</div>
                        </div>
                        
                        :
                        null
                    
                    } */}
                    {this.renderButtons()}
                    
                    <div className={styles.authorDetails}>
                        <div className={styles.detailsContainer}>
                            <p className={styles.date}>{this.state.currentArticle.createdAt.split('T')[0]}</p>

                            <div className={styles.likesContainer}>
                                <div className={styles.msc}>Likes: {this.state.currentArticle && this.state.currentArticle.likes.length}</div>
                                <div className={styles.msc}>Comments: {this.state.currentArticle && this.state.currentArticle.comments.length}</div>
                                
                            </div>

                        </div>
                        <div className={styles.authorContainer}>
                            <h1 className={styles.title}>Title: {this.state.title}</h1>
                            <p className={styles.author}>Author: {this.state.author}</p>
                        </div>
                    </div>

                    <p className={styles.desc}>
                        {this.state.article}
                    </p>

                </div>

                {this.props.isAuthenticated &&
                    <>
                    <p className={styles.commentsLabel}>Comments</p>
                    <div className={styles.commentSection}>

                        <div className={styles.commentBox}>
                            
                            {this.renderComments()}

                        </div>

                        <form className={styles.commentInput} onSubmit={this.handleCommentSubmit}>
                            <textarea className={styles.textarea} name='textarea' id="textarea" placeholder="Enter Comment" value={this.state.textarea} onChange={this.handleInputChange} />
                            <input type="submit" value="add" className={styles.submit} disabled={this.checkCommentSubmitBtn()}/>
                        </form>

                    </div>
                    </>
                }

                

            </div>
        )
        :
        <h1 className={styles.loading}>Loading...</h1>
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
        likeArticle: (articleId) => dispatch(articlesActionCreators.likeArticle(articleId)),
        unlikeArticle: (articleId) => dispatch(articlesActionCreators.unlikeArticle(articleId)),
        addComment: (comment, articleId, username) => dispatch(articlesActionCreators.addComment(comment, articleId, username)),
        removeComment: (key, articleId) => dispatch(articlesActionCreators.removeComment(key, articleId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);