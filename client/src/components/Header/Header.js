
import React, { Component } from 'react';

import styles from './Header.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class Header extends Component {

    render() {
        return (
            <div className={styles.header}>

                <Link to="/" className={styles.logo}>LOGO</Link>


                <div className={styles.nav}>
                    {!this.props.isAuthenticated ? 
                        <>
                        <Link to="/auth/login" className={styles.btn}>Login</Link>
                        <Link to="/auth/register" className={styles.btn}>Register</Link>
                        
                        
                        </>
                        :
                        <>
                        <div className={styles.btn} onClick={() => this.props.history.push('/articles/myArticles')}>MyArticles</div>
                        <div className={styles.btn} onClick={() => this.props.history.push('/articles/new')}>New</div>
                        <div className={styles.btn} onClick={() => this.props.history.push('/auth/settings')}>Settings</div>
                        <div className={styles.btn} onClick={() => this.props.logout()}>Logout</div>
                        
                        {this.props.user ? 
                            <p style={{color: 'red', alignSelf:'center', fontSize: '2rem'}}>{this.props.user.username}</p>
                            :
                            null            
                        }
                        </>
                    }
    
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authActionCreators.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));