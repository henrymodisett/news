import * as types from './types';

export const selectSource = source => ({
    type: types.SELECT_SOURCE,
    source
});

export const requestPosts = source => ({
    type: types.REQUEST_POSTS,
    source
});

export const receivePosts = (source, json) => ({
    type: types.RECEIVE_POSTS,
    source,
    posts: json.articles,
    receivedAt: Date.now()
});

export function sourceHasErrored(bool, status) {
    return {
        type: types.SOURCE_HAS_ERRORED,
        hasErrored: bool,
        statusText: status
    };
}

export function sourceIsLoading(bool) {
    return {
        type: types.SOURCE_IS_LOADING,
        isLoading: bool
    };
}

export const fetchPosts = source => dispatch => {
    dispatch(requestPosts(source));
    dispatch(sourceIsLoading(true));
    const url = `https://newsapi.org/v1/articles?source=${source}&sortBy=top&apiKey=8def3f7caae74a3b8b15ff2a199a36fa`;
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                dispatch(sourceHasErrored(true, response.statusText));
            }
            dispatch(sourceIsLoading(false));
            return response;
        })
        .then(response => response.json())
        .then(json => dispatch(receivePosts(source, json)));
};
