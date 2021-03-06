//-----------------------------------------------------------------------------------------
//----------------------------- Third Party Library imports -------------------------------
//-----------------------------------------------------------------------------------------


import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'


//-----------------------------------------------------------------------------------------
//---------------------------------- Internal imports -------------------------------------
//-----------------------------------------------------------------------------------------

import registerServiceWorker from './registerServiceWorker';
import Home from './views/Home';
import * as reducers from './reducers';

//-----------------------------------------------------------------------------------------
//----------------------------- Create redux store with router  ---------------------------
//-----------------------------------------------------------------------------------------

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key. Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware, logger)
);

//-----------------------------------------------------------------------------------------
//--------------------------------- Define routing ----------------------------------------
//-----------------------------------------------------------------------------------------


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
