import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import redux components
import user from './user';
import transactions from './transactions';
import portfolio from './portfolio';

const reducer = combineReducers({ user, transactions, portfolio });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;

// export all from store component
export * from './user';
export * from './transactions';
export * from './portfolio';
