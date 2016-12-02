import React, { PropTypes } from 'react';
import s from './Reddit.css';

class Posts extends React.Component {
  render() {
    return (
      <ul className={s.posts}>
        {this.props.posts.map((post, index) =>
          <li key={index} className={s.postItem}>
            <a className={s.postTitle} href={post.url}>{post.title}</a>
          </li>
        )}
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
