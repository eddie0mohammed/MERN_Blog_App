import React, { Component } from 'react';

import styles from './Sidebar.module.css';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class Sidebar extends Component {

    handleLinkClick = (url) => {
        this.props.history.push(url);
        this.props.toggleSidebar();
    }

    handleLogout = () => {
        this.props.logout();
        this.props.toggleSidebar();
        this.props.history.push('/auth/login');
    }

    calculateMyArticles = () => {
        if (this.props.user){
            let total = this.props.articles.filter(elem => elem.author._id === this.props.user._id).length;
            return total;

        }
    }

    calculateTotalLikes = () => {
        let total = 0;
        if (this.props.user && this.props.articles){

            this.props.articles.forEach(elem => {
                if (elem.author._id === this.props.user._id){
                    total += elem.likes.length;
                }
            });
        }
        return total;
    }

    render() {
        return (
            <div className={`${styles.sidebar} ${this.props.sidebarOpen ? '' : styles.close} `}>

                <div className={styles.personDetails}>

                    <div className={styles.personImg}>
                        {this.props.user && this.props.user.profilePic &&
                            // <img className={styles.img} src={`/profile-pic/${this.props.user.profilePic}`} alt=""/>
                            <img className={styles.img} src={`${this.props.user.profilePic}`} alt=""/>
                        }
                    </div>
                    <div className={styles.message}>Hi, <span className={styles.name}>{this.props.user && this.props.user.username}</span></div>

                </div>
                
                <div className={styles.btns}>
                    <div className={styles.btn} onClick={() => this.handleLinkClick('/articles/new')}>New</div>
                    <div className={styles.btn} onClick={() => this.handleLinkClick('/articles/myArticles')}>MyArticles</div>

                    <div className={styles.metrics}>

                        <div className={styles.metric}>Total Articles: <span>{this.props.articles && this.calculateMyArticles()}</span></div>
                        <div className={styles.metric}>Total Likes: <span>{this.props.articles && this.props.user && this.calculateTotalLikes()}</span></div>

                    </div>

                    <div className={styles.btn} onClick={() => this.handleLinkClick('/auth/settings')}>Settings</div>
                    <div className={styles.btn} onClick={() => this.handleLogout()}>Logout</div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        articles: state.article.articles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authActionCreators.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));