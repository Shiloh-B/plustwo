import React, { useState } from 'react';

function Post({joke}) {

  const [voteTotal, setVoteTotal] = useState(0);

  return (
    <div className="post-container">
      <div className="post-meta-container">
        <p className="meta-username">Username</p>
        {
        voteTotal > 0 ? 
        <p className="vote-total">+{voteTotal}</p> 
        :
        <p className="vote-total">{voteTotal}</p>
        }
      </div>
      <div className="post-joke-container">
        <h1>{joke}</h1>
      </div>
      <div className="voting-container">
        <div className="button vote-button" onClick={() => setVoteTotal(voteTotal + 2)}>+2</div>
        <div className="button vote-button" onClick={() => setVoteTotal(voteTotal - 2)}>-2</div>
      </div>
    </div>
   
  );
}

export default Post;