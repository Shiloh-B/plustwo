import React, { useEffect } from 'react';
import Post from './post';
import { useSelector, useDispatch } from 'react-redux';
import fire from '../fire';
import { newPost } from '../actions/index';

function Feed() {

  const dispatch = useDispatch();
  const db = fire.firestore();

  let preloadJoke = async () => {
    let resData = await db.collection('posts').doc('user').get();
    resData = resData.data().posts;
    
    resData.forEach((post) => {
      dispatch(newPost(post.post));
    });
  }

  useEffect(() => {
    preloadJoke();
  }, []);

  

  const jokeArray = useSelector(state => state.newPost);
  const posts = jokeArray.map((joke, idx) => <Post joke={joke} key={idx} />);



  return (
    <div className="feed-container">
      {posts}
    </div>
  );
}

export default Feed;