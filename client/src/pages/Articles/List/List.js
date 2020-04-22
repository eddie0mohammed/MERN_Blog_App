import React, { Component } from 'react';

import styles from './List.module.css';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// import * as articlesActionCreators from '../../../Redux/Actions/ArticlesActionCreators';


class List extends Component {

    state = {
        search: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    filterArticles = () => {
        if (this.props.articles){

            let articles = this.props.articles;
            if (this.state.search){
                articles = articles.filter(elem => {
                    if (elem.title.toLowerCase().startsWith(this.state.search.toLowerCase()) || elem.article.toLowerCase().startsWith(this.state.search.toLowerCase()) || elem.author.username.toLowerCase().startsWith(this.state.search.toLowerCase())){
                        return elem;
                    }
                })
            }
        return articles;
        }
    }


    renderArticles = () => {
        return this.props.articles.length === 0  ? 
            <h1 className={styles.negative}>No articles...</h1>
            :
            <>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <input className={styles.search} type="text" name="search" placeholder='Search' value={this.state.search} onChange={this.handleInputChange} autoComplete="off"/>
                </form>

                {this.filterArticles(this.props.articles).map(elem => {
                const createdDate = new Date(elem.createdAt);

                return (
                <div key={elem._id} className={styles.block}>
                    
                    <div className={styles.imgContainer}>
                        {/* <img className={styles.img} src={`/images/${elem.imageURL}`} alt=""/> */}
                        <img className={styles.img} src={`${elem.imageURL}`} alt=""/>
                    </div>
                    
                    <div className={styles.innerBlock}>
                        <div className={styles.row}>
                            <p className={styles.date}>{createdDate.toLocaleString().split(',')[0].split('/').join('.')}</p>        
                            
                            <div className={styles.likesContainer}>
                                <div className={styles.msc}>Likes: {elem.likes.length}</div>
                                <div className={styles.msc}>Comments: {elem.comments.length}</div>
                            </div>
                            
                        </div>

                        <h1 className={styles.title}>{elem.title}</h1>
                        
                        <p className={styles.desc}>{`${elem.article.slice(0, 200)} ...`}</p>

                    </div>

                    <div className={styles.btnContainer}>
                        <p className={styles.author}>By {elem.author.username}</p>        
                        <div className={styles.btn} onClick={() => this.props.history.push(`/articles/${elem._id}`)}>Read More</div>
                    </div>
                    
                </div>  
            )})}
            </>
            

    }

    render() {
        return (
            <div className={styles.list}>

                {this.renderArticles()}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.article.articles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getArticles: () => dispatch(articlesActionCreators.getArticles()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));