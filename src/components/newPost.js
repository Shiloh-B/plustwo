import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { newPost } from '../actions/index';
import fire from '../fire';
import firebase from 'firebase';
import Filter from 'bad-words';

function NewPost() {

  const [post, setPost] = useState('');
  const [lastPostedTime, setLastPostedTime] = useState(0);

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

    // currently a bug with bad-words
    try {
      setPost(filter.clean(post));
    } catch {
      setPost(post);
    }
    
    // obj gets created
    let newPostObj = {
      post: post,
      username: fire.auth().currentUser.displayName,
      uid: fire.auth().currentUser.uid,
      ref: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      score: 0
    }

    // post it to the global feed
    db.collection('posts').add({
      post: post,
      username: fire.auth().currentUser.displayName,
      uid: fire.auth().currentUser.uid,
      timestamp: newPostObj.timestamp,
      score: 0
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

  const keyPressHandler = (e) => {
    if(e.key === 'Enter') {
      newPostHandler();
    }
  }

  


  return (
    <div className="new-post-container">
      <p>Got Something to Say?</p>
      <div className="joke-container">
        <input ref={postRef} onKeyPress={keyPressHandler} className="joke-input" type="text" onChange={(e) => setPost(e.target.value)}></input>
        <div className="post button" onClick={newPostHandler}>Post</div>
      </div>
    </div>
  );
}

export default NewPost;