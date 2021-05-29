import React, { useState, useEffect } from 'react';
import fire from '../fire';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Post({post}) {

  const db = fire.firestore();
  const history = useHistory();

  const [isClicked, setIsClicked] = useState('');

  const email = useSelector(state => state.userData.email);

  const scoreHandler = (vote) => {

    // setIsClicked
    vote === isClicked ? setIsClicked('') : setIsClicked(vote);

    // creates vote document
    db.collection('postVotes').doc(post.ref + fire.auth().currentUser.uid).set({
      postRef: post.ref,
      votersEmaiL: post.email,
      vote: vote === isClicked ? '' : vote
    });
   

  }

  const userAccountHandler = () => {
    db.collection('users').doc(post.email).get().then((res) => {
      let uid = res.data().uid;
      history.push({
        pathname: `/plustwo/${post.username}/${uid}`,
        state: {
          email: post.email,
          username: post.username
        }
      });
    });
  }

  useEffect(() => {
    db.collection('postVotes').doc(post.ref + fire.auth().currentUser.uid).get().then((res) => {
      if(res.exists) {
        setIsClicked(res.data().vote);
      }
    });
  }, []);

  return (
    <div className="post-container">
      <div className="post-meta-container">
        <p className="meta-username" onClick={userAccountHandler}>{post.username}</p>
        {
        post.score > 0 ? 
        <p className="vote-total">+{post.score}</p> 
        :
        <p className="vote-total">{post.score}</p>
        }
      </div>
      <div className="post-joke-container">
        <h1>{post.post}</h1>
      </div>
      
      <div className="voting-container">
        <div className={`${isClicked === 'liked' ? "button-clicked" : "button"} vote-button`} onClick={(vote) => scoreHandler('liked')}>+2</div>
        <div className={`${isClicked === 'disliked' ? "button-clicked" : "button"} vote-button`} onClick={(vote) => scoreHandler('disliked')}>-2</div>
      </div>
    </div>
  );
  
}

export default Post;