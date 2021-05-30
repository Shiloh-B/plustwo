import React from 'react';
import Post from './post';
import { useSelector } from 'react-redux';

function Feed() {
  
  let postArray = useSelector(state => state.newPost);
  const postList = postArray.map((post) => <Post post={post} key={post.ref} />);

  return (
    <div className="feed-container">
      {postList}
    </div>
  );
}

export default Feed;