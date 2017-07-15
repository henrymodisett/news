import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export const history = createHistory();

const enhancers = [
    DevTools.instrument()
];
const middleware = [
    thunk,
    routerMiddleware(history)
];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export function configureStore(initialState) {
    return createStore(
      rootReducer,
      initialState,
      composedEnhancers
    );
}
