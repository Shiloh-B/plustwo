import React, { useState } from 'react';
import fire from '../fire';
import { useSelector } from 'react-redux';

function Post({joke}) {

  const db = fire.firestore();
  const [score, setScore] = useState(joke.score);
  const email = useSelector(state => state.userData.email);

  const scoreHandlerPlus = async () => {
    // locally changes score
    setScore(score + 2);

    // changes global db value
    let posts = await db.collection('posts').doc('user').get();
    posts = posts.data().posts;
    posts.forEach((post) => {
      if(post.ref === joke.ref) {
        post.score = post.score + 2;
      }
    });

    db.collection('posts').doc('user').set({posts: posts});
  }

  const scoreHandlerMinus = async () => {
    // locally changes score
    setScore(score - 2);

    // changes global db value
    let posts = await db.collection('posts').doc('user').get();
    posts = posts.data().posts;
    posts.forEach((post) => {
      if(post.ref === joke.ref) {
        post.score = post.score - 2;
      }
    });

    db.collection('posts').doc('user').set({posts: posts});
  }

  

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

export default Post;