import React from 'react';
import './App.css';

import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SuccessRegistered from './pages/SuccessRegistered/SuccessRegistered';
import ConfirmForgotPassword from './pages/ConfirmForgotPassword/Confirm';
import Settings from './pages/Settings/Settings';
import ChangePicture from './pages/ChangePicture/ChangePicture';
import ResetMyPassword from './pages/ResetMyPassword/ResetMyPassword';

import NewArticle from './pages/Articles/NewArticle/NewArticle';
import EditArticle from './pages/Articles/EditArticle/EditArticle';
import ViewArticle from './pages/Articles/ViewArticle/ViewArticle';
import MyArticles from './pages/Articles/MyArticles/MyArticles';

import Overlay from './components/Overlay/Overlay';
import Sidebar from './components/Sidebar/Sidebar';



import * as authActionCreators from './Redux/Actions/AuthActionCreators';
import * as articlesActionCreators from './Redux/Actions/ArticlesActionCreators';

class App extends React.Component {

  state = {
    sidebarOpen: false
  }

  async componentDidMount(){
  const res = await this.props.getUser();
  if (res.status === 'fail'){
    localStorage.removeItem('token');
  }
    await this.props.getArticles();

  }


  toggleSidebar = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    }


  render(){
    
    return (
      <div className="App">

          <Header toggleSidebar={this.toggleSidebar} sidebarOpen={this.state.sidebarOpen}/>

          <Switch>

            <Route path="/" exact component={Home} />
            {/* <Route path='/' exact component={Home} /> */}
            <Route path='/landing' exact render={(props) => (!this.props.isAuthenticated ? <Landing {...props}/> : <Redirect to='/' />)} />
            <Route path="/auth/register" exact render={(props) => (!this.props.isAuthenticated ? <Register {...props}/> : <Redirect to="/" />)}/>
            <Route path="/auth/login" exact render={(props) => (!this.props.isAuthenticated ? <Login {...props}/> : <Redirect to="/" />)}/>
            <Route path="/auth/forgotPassword" exact component={ForgotPassword}/>
            <Route path="/auth/resetPassword/:token" exact component={ResetPassword}/>
            <Route path="/auth/confirmEmail" exact component={SuccessRegistered}/>
            <Route path="/auth/confirmForgotPassword" exact component={ConfirmForgotPassword}/>
            <Route path="/auth/settings" exact render={(props) => this.props.isAuthenticated ? <Settings {...props} /> : <Redirect to='/auth/login' />}/>
            <Route path="/auth/resetMyPassword" exact render={(props) => this.props.isAuthenticated ? <ResetMyPassword {...props} /> : <Redirect to='/auth/login' />}/>
            <Route path="/auth/changePicture" exact render={(props) => this.props.isAuthenticated ? <ChangePicture {...props} /> : <Redirect to='/auth/login' />}/>

            <Route path='/articles/new' exact render={(props) => (this.props.isAuthenticated ? <NewArticle {...props}/> : <Redirect to='/auth/login' />)} />
            <Route path='/articles/myArticles' exact render={(props) => (this.props.isAuthenticated ? <MyArticles {...props}/> : <Redirect to='/auth/login' />)} />
            <Route path='/articles/edit/:articleId' exact render={(props) => (this.props.isAuthenticated ? <EditArticle {...props}/> : <Redirect to='/auth/login' />)}  />
            <Route path='/articles/:articleId' exact component={ViewArticle} />

            <Route render={() => <Redirect to='/' />} />

          </Switch>


          <Overlay sidebarOpen={this.state.sidebarOpen} toggleSidebar={this.toggleSidebar}/>
          <Sidebar sidebarOpen={this.state.sidebarOpen} toggleSidebar={this.toggleSidebar}/>
          


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
    getUser: () => dispatch(authActionCreators.getUser()),
    getArticles: () => dispatch(articlesActionCreators.getArticles()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
