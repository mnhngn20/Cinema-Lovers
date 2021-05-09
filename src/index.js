import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import trendingMoviesReducer from './store/reducers/trendingMovies';
import searchReducer from './store/reducers/search';
import authReducer from './store/reducers/auth';
import watchListReducer from './store/reducers/watchlist';
import upcomingMoviesReducer from './store/reducers/upcomingMovies';

const rootReducer = combineReducers({
  trendingMoviesState: trendingMoviesReducer,
  searchState: searchReducer,
  authState: authReducer,
  watchListState: watchListReducer,
  upcomingMoviesState: upcomingMoviesReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    : null || compose;

const store = createStore(rootReducer, 
    composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
