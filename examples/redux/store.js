import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [
	thunk,
	sagaMiddleware,
];

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    		// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    	})
    	: compose;

const store = createStore(
	combineReducers({ ...reducers, }),
	composeEnhancers(
		applyMiddleware(...middlewares)
	)
);
sagaMiddleware.run(rootSaga);
export { store };
