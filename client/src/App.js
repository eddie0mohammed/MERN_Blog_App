import React from 'react';
import './App.css';

import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SuccessRegistered from './pages/SuccessRegistered/SuccessRegistered';
import ConfirmForgotPassword from './pages/ConfirmForgotPassword/Confirm';

import NewArticle from './pages/Articles/NewArticle/NewArticle';
import EditArticle from './pages/Articles/EditArticle/EditArticle';
import ViewArticle from './pages/Articles/ViewArticle/ViewArticle';



import * as authActionCreators from './Redux/Actions/AuthActionCreators';
import * as articlesActionCreators from './Redux/Actions/ArticlesActionCreators';

class App extends React.Component {

  componentDidMount(){
    this.props.getUser(this.props.token);
    this.props.getArticles();


  }


  render(){
    
    return (
      <div className="App">

          <Header />

          <Switch>

            {/* <Route path="/" exact render={() => (this.props.isAuthenticated ? <Home /> : <Redirect to='/auth/login' />)} /> */}
            <Route path='/' exact component={Home} />
            <Route path="/auth/register" exact component={Register}/>
            <Route path="/auth/login" exact component={Login}/>
            <Route path="/auth/forgotPassword" exact component={ForgotPassword}/>
            <Route path="/auth/resetPassword/:token" exact component={ResetPassword}/>
            <Route path="/auth/confirmEmail" exact component={SuccessRegistered}/>
            <Route path="/auth/confirmForgotPassword" exact component={ConfirmForgotPassword}/>

            <Route path='/articles/new' exact render={() => (this.props.isAuthenticated ? <NewArticle /> : <Redirect to='/auth/login' />)} />
            <Route path='/articles/edit/:articleId' exact render={() => (this.props.isAuthenticated ? <EditArticle /> : <Redirect to='/auth/login' />)}  />
            <Route path='/articles/:articleId' exact component={ViewArticle} />


          </Switch>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (token) => dispatch(authActionCreators.getUser(token)),
    getArticles: () => dispatch(articlesActionCreators.getArticles()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
