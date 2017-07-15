import { combineReducers } from 'redux';
import * as types from '../actions/types';

const selectedSource = (state = 'espn', action) => {
    switch (action.type) {
        case types.SELECT_SOURCE:
            return action.source;
        default:
            return state;
    }
};

const posts = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case types.REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
            };
        case types.RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            };
        default:
            return state;
    }
};

const postsBySource = (state = { }, action) => {
    switch (action.type) {
        case types.RECEIVE_POSTS:
        case types.REQUEST_POSTS:
            return {
                ...state,
                [action.source]: posts(state[action.source], action)
            };
        default:
            return state;
    }
};

export function sourceHasErrored(state = false, action) {
    switch (action.type) {
        case types.SOURCE_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function sourceIsLoading(state = false, action) {
    switch (action.type) {
        case types.SOURCE_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    postsBySource,
    selectedSource,
    sourceHasErrored,
    sourceIsLoading
});

export default rootReducer;
