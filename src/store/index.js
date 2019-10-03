import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk'

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, thunkMiddleware];

let enhancer = applyMiddleware(...middlewares);

if (process.env.NODE_ENV === 'development') {
  enhancer = composeWithDevTools(enhancer);
}

const configureStore = (preloadedState = {}) => {
  const store = createStore(rootReducer, preloadedState, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
