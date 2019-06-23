import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers';
import mySaga from './saga';

// create the saga middleware
const saga = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      saga
    )
  )
);

// then run the saga
saga.run(mySaga);

export default store;
