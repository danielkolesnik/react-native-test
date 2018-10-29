// outsource
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

// local dependencies
import rootReducer from './reducers';
import rootSaga from './saga';
import { navMiddleware } from './navigation/navigators';

//
// configure Saga Middleware
//
const sagaMiddleware = createSagaMiddleware();

//
// Store
//
export default store = createStore(
    rootReducer,
    applyMiddleware(navMiddleware, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);