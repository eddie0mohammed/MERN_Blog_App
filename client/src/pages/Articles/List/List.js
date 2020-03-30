import React, { Component } from 'react';

import styles from './List.module.css';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// import * as articlesActionCreators from '../../../Redux/Actions/ArticlesActionCreators';




class List extends Component {

    // componentDidMount(){
    //     this.props.getArticles();
    // }


    renderArticles = () => {
        return this.props.articles.length === 0 ? 
            <h1>No articles...</h1>
            :
            (this.props.articles.map(elem => {

                return (
                <div key={elem._id} className={styles.block}>

                    <h1 className={styles.title}>{elem.title}</h1>
                    <div className={styles.innerBlock}>
                        <p className={styles.desc}>{elem.article}</p>
                        <div className={styles.imgContainer}>
                            <img className={styles.img} src={`http://localhost:8080/images/${elem.imageURL}`} alt=""/>

                        </div>
                    </div>

                    <div className={styles.btn} onClick={() => this.props.history.push(`/articles/${elem._id}`)}>Read More</div>

                </div>  
            )}))
            

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