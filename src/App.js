import React, { useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 

import SignUp from './components/Authentication/SignUp/SignUp';
import SignIn from './components/Authentication/SignIn/SignIn';
import MainContent from './containers/MainContent/MainContent';
import Movie from './containers/Movie/Movie';
import TrendingPage from './containers/TrendingPage/TrendingPage';
import Layout from './hoc/Layout/Layout';
import Logout from './components/Authentication/Logout/Logout';
import * as actions from './store/actions/index';
import Profile from './containers/Profile/Profile';
import WatchListPage from './containers/WatchListPage/WatchListPage';

const App = props => {
  const { onAutoSignIn } = props;
  useState(() => {
    onAutoSignIn();
  }, [onAutoSignIn]);

  let routes = (
    <Switch>
      <Route path = '/movies/:id' component={Movie}/>
      <Route path = '/signup' component={SignUp} />
      <Route path = '/signin' component={SignIn} />
      <Route path = '/trending' component={TrendingPage}/>
      <Route path = '/' component={MainContent} />
      <Redirect to ='/' />
    </Switch>
  )
  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path = '/watchlist' component={WatchListPage} />
        <Route path = '/profile' component={Profile} />
        <Route path = '/logout' component={Logout} />
        <Route path = '/movies/:id' component={Movie}/>
        <Route path = '/trending' component={TrendingPage}/>
        <Route path = '/' exact component={MainContent} />
      {/* <Redirect to ='/' /> */}
    </Switch>
    )
  }
  return (
      <Layout>
        {routes}
      </Layout>
  );
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.authState.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAutoSignIn: () => dispatch(actions.autoSignIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
