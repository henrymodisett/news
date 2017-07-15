import React from 'react';
import PropTypes from 'prop-types';

const Posts = ({posts}) => (
  <ul className="posts">
    {posts.map((post, i) =>
      <li className="post" key={i}>
        <div className="post_content">
          <a href={post.url} target="_blank" className="post_title">{post.title}</a>
          <div className="img_wrapper">
            <img src={post.urlToImage} />
          </div>
          <p className="description">{post.description}</p>
        </div>
      </li>
    )}
  </ul>
);

Posts.propTypes = {
    posts: PropTypes.array.isRequired
};

export default Posts;
