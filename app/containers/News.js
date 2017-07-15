import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSource, fetchPosts } from '../actions';
import Posts from '../components/Posts';
import SourceSwitchLink from './SourceSwitchLink';

class News extends Component {
    static propTypes = {
        selectedSource: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, selectedSource } = this.props;
        dispatch(fetchPosts(selectedSource));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSource !== this.props.selectedSource) {
            const { dispatch, selectedSource } = nextProps;
            dispatch(fetchPosts(selectedSource));
        }
    }

    handleChange = nextSource => {
        this.props.dispatch(selectSource(nextSource));
    }

    handleRefreshClick = e => {
        e.preventDefault();
        const { dispatch, selectedSource } = this.props;
        dispatch(fetchPosts(selectedSource));
    }

    render() {
        const { posts, isFetching } = this.props;
        const isEmpty = posts.length === 0;
        return (
            <div className="news container">
                <div className="sources">
                  <SourceSwitchLink source="espn">
                     ESPN
                  </SourceSwitchLink>
                  <SourceSwitchLink source="techcrunch">
                      Techcrunch
                  </SourceSwitchLink>
                  <SourceSwitchLink source="bbc-news">
                      BBC
                  </SourceSwitchLink>
                  <SourceSwitchLink source="Buzzfeed">
                      Buzzfeed
                  </SourceSwitchLink>
                </div>
                {isFetching && isEmpty &&
                    <h2>Loading...</h2>
                }
                {!isEmpty &&
                    <div className="content">
                        <Posts posts={posts} />
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { selectedSource, postsBySource } = state;
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySource[selectedSource] || {
        isFetching: true,
        items: []
    };

    return {
        selectedSource,
        posts,
        isFetching,
        lastUpdated
    };
};

export default connect(mapStateToProps)(News);
