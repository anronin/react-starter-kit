import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../../actions/reddit';
import Picker from './Picker';
import Posts from './Posts';
import s from './Reddit.css';

class Reddit extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>Reddit posts from {selectedSubreddit} subreddit</h1>
          <Picker
            value={selectedSubreddit}
            onChange={this.handleChange}
            options={['reactjs', 'frontend']}
          />
          <p>
            {lastUpdated &&
              <span className={s.updateDate}>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                {' '}
              </span>
            }
            {!isFetching &&
              <a
                href="#refresh"
                onClick={this.handleRefreshClick}
              >
                Refresh
              </a>
            }
          </p>
          {isFetching && posts.length === 0 &&
            <h2>Loading...</h2>
          }
          {!isFetching && posts.length === 0 &&
            <h2>Empty.</h2>
          }
          {posts.length > 0 &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
          }
        </div>
      </div>
    );
  }
}

Reddit.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

const EnhancedReddit = connect(mapStateToProps)(Reddit);

export default withStyles(s)(EnhancedReddit);
