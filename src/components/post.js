import React, { useState, useEffect } from 'react';
import fire from '../fire';
import { useSelector } from 'react-redux';

function Post({joke}) {

  const db = fire.firestore();
  const [score, setScore] = useState(joke.score);
  const [isClicked, setIsClicked] = useState('');

  const email = useSelector(state => state.userData.email);

  const scoreHandlerPlus = () => {
    if(isClicked !== 'liked') {
      setIsClicked('liked');
      // locally changes score
      setScore(score + 2);

      // changes global db value
      db.collection('posts').doc('user').get().then((res) => {
        let postArray = res.data().posts;
        postArray.forEach((post) => {
          if(post.ref === joke.ref) {
            post.score = post.score + 2;
            if(post.dislikedUsers.includes(email)) {
              post.dislikedUsers.splice(email);
            }
            if(!post.likedUsers.includes(email)) {
              post.likedUsers.push(email);
            }
          }
        });
        db.collection('posts').doc('user').set({posts: postArray});
      });

      // add it to users liked posts list
      db.collection('users').doc(joke.email).get().then((res) => {
        let postArray = res.data().posts;
        postArray.forEach((post) => {
          if(post.ref === joke.ref) {
            if(post.dislikedUsers.includes(email)) {
              post.dislikedUsers.splice(email);
            }
            if(!post.likedUsers.includes(email)) {
              post.likedUsers.push(email);
            }
            post.score = post.score + 2;
          }
        });
        db.collection('users').doc(joke.email).set({posts: postArray});
      });
    }
  }

  const scoreHandlerMinus = () => {
    if(isClicked !== 'disliked') {
      setIsClicked('disliked');
      // locally changes score
      setScore(score - 2);

       // changes global db value
       db.collection('posts').doc('user').get().then((res) => {
        let postArray = res.data().posts;
        postArray.forEach((post) => {
          if(post.ref === joke.ref) {
            post.score = post.score - 2;
            if(post.likedUsers.includes(email)) {
              post.likedUsers.splice(email);
            }
            if(!post.dislikedUsers.includes(email)) {
              post.dislikedUsers.push(email);
            }
          }
        });
        db.collection('posts').doc('user').set({posts: postArray});
      });

      // add it to users liked posts list
      db.collection('users').doc(joke.email).get().then((res) => {
        let postArray = res.data().posts;
        postArray.forEach((post) => {
          if(post.ref === joke.ref) {
            if(post.likedUsers.includes(email)) {
              post.likedUsers.splice(email);
            }
            if(!post.dislikedUsers.includes(email)) {
              post.dislikedUsers.push(email);
            }
            post.score = post.score - 2;
          }
        });
        db.collection('users').doc(joke.email).set({posts: postArray});
      });
    }    
  }

  if(isClicked === 'liked') {
    return (
      <div className="post-container">
        <div className="post-meta-container">
          <p className="meta-username">{joke.username}</p>
          {
          score > 0 ? 
          <p className="vote-total">+{score}</p> 
          :
          <p className="vote-total">{score}</p>
          }
        </div>
        <div className="post-joke-container">
          <h1>{joke.post}</h1>
        </div>
        <div className="voting-container">
          <div className="button-clicked vote-button">+2</div>
          <div className="button vote-button" onClick={scoreHandlerMinus}>-2</div>
        </div>
      </div>
    );
  } else if(isClicked ==='disliked') {
    return (
      <div className="post-container">
        <div className="post-meta-container">
          <p className="meta-username">{joke.username}</p>
          {
          score > 0 ? 
          <p className="vote-total">+{score}</p> 
          :
          <p className="vote-total">{score}</p>
          }
        </div>
        <div className="post-joke-container">
          <h1>{joke.post}</h1>
        </div>
        <div className="voting-container">
          <div className="button vote-button" onClick={scoreHandlerPlus}>+2</div>
          <div className="button-clicked vote-button">-2</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="post-container">
        <div className="post-meta-container">
          <p className="meta-username">{joke.username}</p>
          {
          score > 0 ? 
          <p className="vote-total">+{score}</p> 
          :
          <p className="vote-total">{score}</p>
          }
        </div>
        <div className="post-joke-container">
          <h1>{joke.post}</h1>
        </div>
        <div className="voting-container">
          <div className="button vote-button" onClick={scoreHandlerPlus}>+2</div>
          <div className="button vote-button" onClick={scoreHandlerMinus}>-2</div>
        </div>
      </div>
     
    );
  }

  
}

export default Post;