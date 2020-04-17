
import React, { Component } from 'react';

import styles from './Header.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Burger from '@animated-burgers/burger-rotate';
import '@animated-burgers/burger-rotate/dist/styles.css' 


class Header extends Component {


    render() {
    
        return (
            <div className={styles.header}>

                <Link to="/" className={styles.logo}>MYBLOG</Link>

                <div className={styles.nav}>
                    {!this.props.isAuthenticated ? 
                        <>
                            <Link to="/auth/login" className={styles.btn}>Login</Link>
                            <Link to="/auth/register" className={styles.btn}>Register</Link>
                        </>
                        :
                        <>
                           
                            <Burger isOpen={this.props.sidebarOpen} style={{fontSize: '8px', position: 'relative', zIndex: 1000}} onClick={this.props.toggleSidebar}/>
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
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));