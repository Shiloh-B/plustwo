import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newPost } from '../actions/index';
import fire from '../fire';

function NewPost() {

  const [post, setPost] = useState('');

  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const db = fire.firestore();

  const postRef = React.useRef();

  const newPostHandler = () => {

    // obj gets created
    let newPostObj = {
      post: post,
      username: userData.username,
      email: userData.email,
      likedUsers: [],
      dislikedUsers: [],
      score: 0,
      ref: ''
    }

    // post it to the global feed
    db.collection('feedPosts').add({
      post: post,
      username: userData.username,
      email: userData.email,
      likedUsers: [],
      dislikedUsers: [],
      score: 0
    }).then((ref) => {
      newPostObj.ref = ref.id;
      ref.set({ref: ref.id}, {merge: true});

      // post it to users post list
      db.collection('users').doc(userData.email).get().then((res) => {
        let userPostArray = res.data().posts;
        userPostArray.unshift(newPostObj);
        console.log(userPostArray);
        db.collection('users').doc(userData.email).set({posts: userPostArray}, {merge: true});
      });
    });
    
    // finally add it to the redux store
    dispatch(newPost(newPostObj));

    // clear post input bar
    postRef.current.value = '';
  }

  

  return (
    <div className="new-post-container">
      <p>Got Something to Say?</p>
      <div className="joke-container">
        <input className="joke-input" type="text" onChange={(e) => setPost(e.target.value)}></input>
        <div ref={postRef} className="post button" onClick={newPostHandler}>Post</div>
      </div>
    </div>
  );
}

export default NewPost;