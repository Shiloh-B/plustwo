import React from 'react';

function UserPost({post}) {
  return (
    <div className="post-container">
      <div className="post-meta-container">
        <p className="meta-username">{post.username}</p>
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
    </div>
  );
}

export default UserPost;