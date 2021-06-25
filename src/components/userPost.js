import React, { useState, useEffect }  from 'react';
import fire from '../fire';
import ClampLines from 'react-clamp-lines';

function UserPost({post}) {

  const [score, setScore] = useState(0);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('Are you sure you want to delete this post?');
  const db = fire.firestore();

  const deletePostHandler = () => {
    db.collection('posts').doc(post.ref).delete().then(() => {
      setDeleteMessage('Post deleted!');
    }).catch((err) => {
      console.log(err);
      setDeleteMessage('Oops. Something went wrong, your post has not been deleted.');
    });
  }

  const closeHandler = () => {
    if(deleteMessage === 'Post deleted!') {
      window.location.reload();
    }
    setDeleteMessage('Are you sure you want to delete this post?');
    setDeletePopup(false);
  }

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
  }, [db, post.ref]);

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
      {
        deletePopup ?
        <div className="delete-modal-container">
          <div className="delete-modal">
            <h1>{deleteMessage}</h1>
            <div className="delete-button-container">
              {
                deleteMessage === 'Are you sure you want to delete this post?' ?
                <>
                <div className="button" onClick={closeHandler}>Cancel</div>
                <div className="button" onClick={deletePostHandler}>Delete</div>
                </>
                :
                <div className="button" onClick={closeHandler}>Close</div>
              }
            </div>
          </div>
        </div>
        :
        <>
        </>
      }
      
      <div className="post-joke-container">
        {
          fire.auth().currentUser.uid === post.uid ?  
          <>
          <div className="delete-button" onClick={() => setDeletePopup(true)}>X</div>
          <ClampLines 
            text={post.post}
            id={post.ref}
            lines={4}
            ellipsis="..."
            moreText="More"
            lessText="Less"
            innerElement="h1"
          />
          </>
          : 
          <ClampLines 
            text={post.post}
            id={post.ref}
            lines={4}
            ellipsis="..."
            moreText="More"
            lessText="Less"
            innerElement="h1"
          /> 
        }
      </div>
    </div>
  );
}

export default UserPost;