
import React, { Component } from 'react';

import styles from './EditArticle.module.css';

import {connect} from 'react-redux';

import * as articlesActionCreator from '../../../Redux/Actions/ArticlesActionCreators';

class EditArticle extends Component {

    state = {
        title: '',
        article: '',
        id: '',
        // imageURL: '',
        selectedFile: null,
    }

    componentDidMount(){
        const id = this.props.match.params.articleId;
        const currentArticle = this.props.articles.filter(elem => elem._id === id)[0];
        this.setState({
            title: currentArticle.title,
            article: currentArticle.article,
            id: currentArticle._id,
            
        });

    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSelectedFile = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(this.state);
        await this.props.updateArticle(this.state.id, this.state.title, this.state.article, this.state.selectedFile);

        if (!this.props.error){

            this.props.history.push('/');
        }
    }

    checkSubmitBtn = () => {
        let check = true;
        if (this.state.title && this.state.article){
            check = false;
        }
        return check;
    }

    render() {

        return (
            <div className={styles.newArticle}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Edit Article</h1>

                    <input className={styles.input} type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.inputChangeHandler}/>

                    <input className={styles.file} type="file" onChange={this.handleSelectedFile}/>
                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null }

                    <textarea className={styles.textarea} type="text" name="article" placeholder="Article" value={this.state.article} onChange={this.inputChangeHandler}/>

                    <input className={styles.submit} type="submit" value='Submit' disabled={this.checkSubmitBtn()}/>

                </form>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.article.articles,
        error: state.error.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateArticle: (id, title, article, file) => dispatch(articlesActionCreator.updateArticle(id, title, article, file)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);