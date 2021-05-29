import React from 'react';
import Post from './post';
import { useSelector } from 'react-redux';

function Feed() {

  const postArray = useSelector(state => state.newPost);
  const postList = postArray.map((post, idx) => <Post post={post} key={idx} />);

  return (
    <div className="feed-container">
      {postList}
    </div>
  );
}

export default Feed;