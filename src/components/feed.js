import React, { useState, useEffect } from 'react';
import Post from './post';
import { useSelector, useDispatch } from 'react-redux';
import fire from '../fire';
import { newPost, userData } from '../actions/index';

function Feed() {

  const dispatch = useDispatch();
  const db = fire.firestore();
  const email = useSelector(state => state.userData.email);

  const [isClicked, setIsClicked] = useState('');

  let preloadJoke = async () => {
    let resData = await db.collection('posts').doc('user').get();
    resData = resData.data().posts;
    
    if(resData) {
      resData.forEach((post) => {
        dispatch(newPost(post));
      });
    } else {
      dispatch(newPost({}));
    }
    
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