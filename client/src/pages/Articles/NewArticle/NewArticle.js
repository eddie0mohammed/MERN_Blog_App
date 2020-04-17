
import React, { Component } from 'react';

import styles from './NewArticle.module.css';
import {connect} from 'react-redux';

import * as articleActionCreators from '../../../Redux/Actions/ArticlesActionCreators';

class NewArticle extends Component {

    state = {
        title: '',
        article: '',
        selectedFile: null,
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
        await this.props.addArticle(this.state.title, this.state.article, this.state.selectedFile);

        if (!this.props.error){
            this.props.history.push('/');

        }
    }

    checkSubmitBtn = () => {
        let check = true;
        if (this.state.title && this.state.article && this.state.selectedFile){
            check = false;
        }
        return check;
    }

    render() {


        return (
            <div className={styles.newArticle}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>New Article</h1>

                    <input className={styles.input} type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.inputChangeHandler} autoComplete="off"/>

                    <input className={styles.file} style={{display: 'none'}} type="file" onChange={this.handleSelectedFile} ref={imgInput => this.imgInput = imgInput} />

                    <div className={styles.button} onClick={() => this.imgInput.click()}>Choose File</div>
                    
                    <p className={styles.fileName}>{this.state.selectedFile && this.state.selectedFile.name}</p>

                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null }

                    <textarea className={styles.textarea} type="text" name="article" placeholder="Article" value={this.state.article} onChange={this.inputChangeHandler} autoComplete="off"/>

                    <input className={styles.submit} type="submit" value='Submit' disabled={this.checkSubmitBtn()}/>

                </form>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addArticle: (title, article, file) => dispatch(articleActionCreators.addArticle(title, article, file)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);