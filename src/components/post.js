import React, { useState, useEffect } from 'react';
import fire from '../fire';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

function Post({post}) {

  const db = fire.firestore();
  const history = useHistory();

  const [isClicked, setIsClicked] = useState('');
  const [localScore, setLocalScore] = useState(0);

  const voteMap = new Map();
  voteMap.set('liked', {value: 2});
  voteMap.set('disliked', {value: -2});
  voteMap.set('', {value: 0});


  const scoreHandler = (vote) => {
    let incomingVote = vote === isClicked ? '' : vote;
    let diff = voteMap.get(incomingVote).value - voteMap.get(isClicked).value;
    const updateScore = firebase.firestore.FieldValue.increment(diff);

    // setIsClicked and localscore
    setIsClicked(incomingVote);
    setLocalScore(localScore + diff);
    vote === isClicked ? setIsClicked('') : setIsClicked(vote);
    
    // creates vote document
    db.collection('postVotes').doc(post.ref + fire.auth().currentUser.uid).set({
      postRef: post.ref,
      votersUid: post.uid,
      vote: incomingVote
    });

    // sets the score on the post
    db.collection('posts').doc(post.ref).set({score: updateScore}, {merge: true});
   

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
    const unsubscribe = fire.auth().onAuthStateChanged(user => {
      if(user !== null) {
        db.collection('postVotes').doc(post.ref + user.uid).get().then((res) => {
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
      } else {
        history.push('/oops');
      }
      
      return(() => unsubscribe());
    });
  }, [db, history, post.ref]);

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