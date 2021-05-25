import React, { useState } from 'react';

function Post({joke}) {

  const [voteTotal, setVoteTotal] = useState(joke.score);

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
        <div className="button vote-button" onClick={() => setVoteTotal(voteTotal + 2)}>+2</div>
        <div className="button vote-button" onClick={() => setVoteTotal(voteTotal - 2)}>-2</div>
      </div>
    </div>
   
  );
}

export default Post;