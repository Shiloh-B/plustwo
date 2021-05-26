import React, { useState } from 'react';
import fire from '../fire';

function Post({joke}) {

  const db = fire.firestore();

  const [voteTotal, setVoteTotal] = useState(joke.score);

  const voteHandlerPlus = () => {
    db.collection('posts').doc('users').where('posts', 'array-contains', joke.username)
    .set({score: joke.score + 2});
  }

  const voteHandlerMinus = () => {
    db.collection('posts').doc('users').where('posts', 'array-contains', joke.username)
    .set({score: joke.score - 2});
  }

  return (
    <div className="post-container">
      <div className="post-meta-container">
        <p className="meta-username">{joke.username}</p>
        {
        voteTotal > 0 ? 
        <p className="vote-total">+{voteTotal}</p> 
        :
        <p className="vote-total">{voteTotal}</p>
        }
      </div>
      <div className="post-joke-container">
        <h1>{joke.post}</h1>
      </div>
      <div className="voting-container">
        <div className="button vote-button" onClick={voteHandlerPlus}>+2</div>
        <div className="button vote-button" onClick={voteHandlerMinus}>-2</div>
      </div>
    </div>
   
  );
}

export default Post;