import React, { useState, useEffect } from 'react';
import fire from '../fire';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Post({post}) {

  const db = fire.firestore();
  const history = useHistory();

  const [isClicked, setIsClicked] = useState('');
  const [localScore, setLocalScore] = useState(0);

  const email = useSelector(state => state.userData.email);

  const scoreHandler = (vote) => {

    // setIsClicked
    vote === isClicked ? setIsClicked('') : setIsClicked(vote);

    if(vote === isClicked) {
      setIsClicked('');
    }

    // creates vote document
    db.collection('postVotes').doc(post.ref + fire.auth().currentUser.uid).set({
      postRef: post.ref,
      votersUid: post.uid,
      vote: vote === isClicked ? '' : vote
    });

    // evaluate local score
    if((vote === isClicked && vote === 'liked') || (vote === 'disliked' && vote !== isClicked)) {
      if(vote === 'disliked' && isClicked === 'liked') {
        setLocalScore(localScore - 4);
        return;
      }
      setLocalScore(localScore - 2);
    } else if((vote === isClicked && vote === 'disliked') || (vote === 'liked' && vote !== isClicked)) {
      if(vote === 'liked' && isClicked === 'disliked') {
        setLocalScore(localScore + 4);
        return;
      }
      setLocalScore(localScore + 2);
    }
   

  }

  const userAccountHandler = () => {
    db.collection('users').doc(post.uid).get().then((res) => {
      history.push({
        pathname: `/plustwo/${post.username}/${post.uid}`,
        state: {
          email: fire.auth().currentUser.email,
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

    db.collection('postVotes').where('postRef', '==', post.ref).get().then((snapshot) => {
      let tempScore = 0;
      snapshot.forEach((doc) => {
        if(doc.data().vote === 'liked') {
          tempScore += 2;
        } else if(doc.data().vote === 'disliked') {
          tempScore -= 2;
        }
      });
      setLocalScore(tempScore);
    });
  }, []);

  return (
    <div className="post-container">
      <div className="post-meta-container">
        <p className="meta-username" onClick={userAccountHandler}>{post.username}</p>
        {
        localScore > 0 ? 
        <p className="vote-total">+{localScore}</p> 
        :
        <p className="vote-total">{localScore}</p>
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