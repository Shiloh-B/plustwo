import React from 'react';
import Post from './post';
import Loading from './loading';
import { useSelector } from 'react-redux';

function Feed({isLoading}) {

  
  
  let postArray = useSelector(state => state.newPost);
  const postList = postArray.map((post) => <Post post={post} key={post.ref} />);

  return (
    <div className="feed-container">

      {
        isLoading ? <Loading /> : postList
      }
    </div>
  );
}

export default Feed;