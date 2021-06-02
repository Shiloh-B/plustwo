import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newPost } from '../actions/index';
import fire from '../fire';
import firebase from 'firebase';
import Filter from 'bad-words';

function NewPost() {

  const [post, setPost] = useState('');
  const [lastPostedTime, setLastPostedTime] = useState(0);

  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const db = fire.firestore();
  const filter = new Filter();
  const badWordsArray = [
    'ch1nk',
    'cummies',
    'nigg',
    'crackwhore',
    'beaner',
  ]
  filter.addWords(...badWordsArray);

  const postRef = useRef(null);

  const newPostHandler = () => {
    if(!post.replace(/\s/g, '').length) {
      alert('You can\'t post nothing!');
      postRef.current.value = '';
      setPost('');
      return;
    }

    if(new Date() - lastPostedTime < 10000) {
      alert('You posted too recently!');
      return;
    }

    // set lastPosted time
    setLastPostedTime(new Date());

    
    // obj gets created
    let newPostObj = {
      post: filter.clean(post),
      username: userData.username,
      email: userData.email,
      ref: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }

    // post it to the global feed
    db.collection('posts').add({
      post: filter.clean(post),
      username: userData.username,
      email: userData.email,
      timestamp: newPostObj.timestamp
    }).then((ref) => {
      newPostObj.ref = ref.id;
      ref.set({ref: ref.id}, {merge: true});

      // finally add it to the redux store
      dispatch(newPost(newPostObj));
    });

    
    

    // clear post input bar
    postRef.current.value = '';
    setPost('');
    

    
  }

  

  return (
    <div className="new-post-container">
      <p>Got Something to Say?</p>
      <div className="joke-container">
        <input ref={postRef} className="joke-input" type="text" onChange={(e) => setPost(e.target.value)}></input>
        <div className="post button" onClick={newPostHandler}>Post</div>
      </div>
    </div>
  );
}

export default NewPost;