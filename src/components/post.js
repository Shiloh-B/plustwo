import React, { useState, useEffect } from 'react';
import fire from '../fire';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Post({post}) {

  const db = fire.firestore();
  const history = useHistory();

  const [score, setScore] = useState(post.score);
  const [isClicked, setIsClicked] = useState('');

  const email = useSelector(state => state.userData.email);

  const scoreHandler = (num, vote) => {

    // set our liked or disliked var
    vote === 'liked' ? setIsClicked('liked') : setIsClicked('disliked');

    // first locally update score
    setScore(score + num);

    // contact global feed and change score
    db.collection('feedPosts').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if(doc.ref === post.ref) {
          doc.ref.set({score: score + num}, {merge: true});
        }
      });
    });

    // contact users feed and change score
    db.collection('users').doc(email).get().then((res) => {
      let userPostArray = res.data().posts;
      userPostArray.forEach((userPost) => {
        if(userPost.ref === post.ref) {
          userPost.score = userPost.score + num;
          db.collection('users').doc(email).set({posts: userPostArray}, {merge: true});
        }
      });
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
    if(post.likedUsers.includes(email)) {
      setIsClicked('liked');
    } else if(post.dislikedUsers.includes(email)) {
      setIsClicked('disliked');
    }
  }, []);

  if(isClicked == 'liked') {
    return (
      <div className="post-container">
        <div className="post-meta-container">
          <p className="meta-username">{post.username}</p>
          {
          score > 0 ? 
          <p className="vote-total">+{score}</p> 
          :
          <p className="vote-total">{score}</p>
          }
        </div>
        <div className="post-joke-container">
          <h1>{post.post}</h1>
        </div>
        <div className="voting-container">
          <div className="button-clicked vote-button">+2</div>
          <div className="button vote-button" onClick={(num, vote) => scoreHandler(-2, 'disliked')}>-2</div>
        </div>
      </div>
    );
  } else if(isClicked == 'disliked') {
    return (
      <div className="post-container">
        <div className="post-meta-container">
          <p className="meta-username">{post.username}</p>
          {
          score > 0 ? 
          <p className="vote-total">+{score}</p> 
          :
          <p className="vote-total">{score}</p>
          }
        </div>
        <div className="post-joke-container">
          <h1>{post.post}</h1>
        </div>
        <div className="voting-container">
          <div className="button vote-button" onClick={(num, vote) => scoreHandler(2, 'liked')}>+2</div>
          <div className="button-clicked vote-button">-2</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="post-container">
        <div className="post-meta-container">
          <p className="meta-username" onClick={userAccountHandler}>{post.username}</p>
          {
          score > 0 ? 
          <p className="vote-total">+{score}</p> 
          :
          <p className="vote-total">{score}</p>
          }
        </div>
        <div className="post-joke-container">
          <h1>{post.post}</h1>
        </div>
        <div className="voting-container">
          <div className="button vote-button" onClick={(num, vote) => scoreHandler(2, 'liked')}>+2</div>
          <div className="button vote-button" onClick={(num, vote) => scoreHandler(-2, 'disliked')}>-2</div>
        </div>
      </div>
     
    );
  }

  
}

export default Post;