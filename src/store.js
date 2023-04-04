import { createStore, applyMiddleware } from 'redux';
import  thunkMiddleware  from 'redux-thunk';

import reducer from './reducers';

const logMiddleware = ({getState}) => (next) => (action) => {
  console.log(action.type, store.getState());
  return next(action)
}


const strinngMiddleware = () => (next) => (action) => {
   if (typeof action === 'string') {
      return next({
        type: action
      });
    }
    return next(action)
}



const store = createStore(reducer, applyMiddleware(thunkMiddleware, strinngMiddleware, logMiddleware));

const delayedActionCreator = (timeout) =>  (dispatch) => {
  setTimeout(() => dispatch({
    type: 'DELAYED_ACTION'
  }), timeout);
}

store.dispatch(delayedActionCreator(3000));

export default store;