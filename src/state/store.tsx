import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import { loadState } from './localStorage'
import IndexReducers from '../index-reducers'
import IndexSagas from '../index-sagas'

const sagaMiddleware = createSagaMiddleware()
const persistedState = loadState();

//
// Redux DevTools
// https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
//
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

declare const window: any;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * create a redux store with
 * 1. Persisted State
 * 2. Saga middlewares
 * 3. Redux DevTools browser extension
 */
const store = createStore(
  IndexReducers,
  persistedState,
  composeEnhancers(applyMiddleware(sagaMiddleware)
  ));

sagaMiddleware.run(IndexSagas)

store.subscribe(() => {
  window.api = store.getState().api;

});

export default store;
