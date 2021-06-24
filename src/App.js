import React, { useState, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 

import Spinner from './components/UI/Spinner/Spinner';
import MainContent from './containers/MainContent/MainContent';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

const SignUp = React.lazy(() => {
  return import('./components/Authentication/SignUp');
}) 

const SignIn = React.lazy(() => {
  return import('./components/Authentication/SignIn');
}) 
const Movie = React.lazy(() => {
  return import('./containers/Movie/Movie');
}) 
const Profile = React.lazy(() => {
  return import('./containers/Profile/Profile');
}) 
const WatchListPage = React.lazy(() => {
  return import('./containers/WatchListPage/WatchListPage');
}) 

const App = props => {
  const { onAutoSignIn } = props;
  useState(() => {
    onAutoSignIn();
  }, [onAutoSignIn]);

  let routes = (
    <Switch>
      <Route path = '/signup' exact render={props => <SignUp {...props} />} />
      <Route path = '/signin' exact render={props => <SignIn {...props} />} />
      <Route path = '/movies/:id' render={props => <Movie {...props}  />}/>
      <Route path = '/' component={MainContent} />
      <Redirect to ='/' />
    </Switch>
  )
  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path = '/watchlist' render={props => <WatchListPage {...props} />} />
        <Route path = '/profile' render={props => <Profile {...props} />}/>
        <Route path = '/movies/:id' render={props => <Movie {...props}/> } />
        <Route path = '/' exact component={MainContent} />
      <Redirect to ='/' />
      </Switch>
    )
  }
  return (
    <div>
      <Layout>
        <Suspense fallback = {<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
    </div>
      
  );
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.authState.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAutoSignIn: () => dispatch(actions.autoSignIn()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
