import React from 'react';
import Post from './post';
import { useSelector } from 'react-redux';

function Feed() {

  const jokeArray = useSelector(state => state.newPost);
  const posts = jokeArray.map((joke, idx) => <Post joke={joke} key={idx} />);
  return (
    <div className="feed-container">
      {posts}
    </div>
  );
}

export default Feed;