import React, { useState, useEffect }  from 'react';
import fire from '../fire';

function UserPost({post}) {

  const [score, setScore] = useState(0);
  const db = fire.firestore();

  useEffect(() => {
    // checking the votes on each post
    db.collection('postVotes').where('postRef', '==', post.ref).get().then((snapshot) => {
      let tempScore = 0;
      snapshot.forEach((doc) => {
        if(doc.data().vote === 'liked') {
          tempScore += 2;
        } else if(doc.data().vote === 'disliked') {
          tempScore -= 2;
        }
      });
      setScore(tempScore);
    });
  }, []);

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
    </div>
  );
}

export default UserPost;