import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import RootReducer from './Root.Reducer';


    const middlewares=[logger];

    const store = createStore(RootReducer,applyMiddleware(...middlewares));


export default store;