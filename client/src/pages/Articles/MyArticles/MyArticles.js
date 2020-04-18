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
            <h1 className={styles.negative}>No articles...</h1>
            :
            (this.filterArticles(this.props.articles).map(elem => {
                const createdDate = new Date(elem.createdAt);

                return (
                <div key={elem._id} className={styles.block}>

                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={`/images/${elem.imageURL}`} alt=""/>
                    </div>
                    
                    <div className={styles.innerBlock}>
                        <div className={styles.row}>
                            <p className={styles.date}>{createdDate.toLocaleString().split(',')[0].split('/').join('.')}</p>        
                            
                            <div className={styles.likesContainer}>
                                <div className={styles.msc}>Likes: 0</div>
                                <div className={styles.msc}>Comments: 0</div>
                            </div>
                            
                        </div>

                        <h1 className={styles.title}>{elem.title}</h1>
                        
                        <p className={styles.desc}>{`${elem.article.slice(0, 200)}...`}</p>

                    </div>

                    <div className={styles.btnContainer}>
                        <p className={styles.author}>By {elem.author.username}</p>        
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