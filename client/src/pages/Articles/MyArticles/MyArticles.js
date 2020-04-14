import React, { Component } from 'react'

import {connect} from 'react-redux';

import styles from './MyArticles.module.css';

class MyArticles extends Component {

    // state = {
    //     articles: []
    // }

    // componentDidMount(){

    //     this.setState({
    //         articles: this.props.articles
    //     })

    // }

    filterArticles = (arr) => {
        return arr.filter(elem => {
           return elem.author._id === this.props.currentUser._id
        });
    }

    renderArticles = () => {
        return this.props.articles.length === 0 ? 
            <h1>No articles...</h1>
            :
            (this.filterArticles(this.props.articles).map(elem => {
                const createdDate = new Date(elem.createdAt);

                return (
                <div key={elem._id} className={styles.block}>

                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={`http://localhost:8080/images/${elem.imageURL}`} alt=""/>
                    </div>
                    <div className={styles.innerBlock}>
                        <h1 className={styles.title}>{elem.title}</h1>
                        <div className={styles.text}>
                            <p className={styles.desc}>{`${elem.article.slice(0, 200)}...`}</p>
                            <p className={styles.details}>{elem.author.username} - {createdDate.toLocaleString().split(',')[0]}</p>
                            
                        </div>
                        
                    </div>
                    
                    <div className={styles.btnContainer}>
                        <div className={styles.btn} onClick={() => this.props.history.push(`/articles/${elem._id}`)}>Read More</div>
                    </div>
                    
                </div>  
            )}))
    }


    render() {
        
        return (
            <div className={styles.list}>
                <h1 className={styles.header}>My Articles</h1>
                <div className={styles.list1}>
                    {this.renderArticles()}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.article.articles,
        currentUser: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MyArticles);