import React, { useEffect, useState } from 'react';
import Nav from './nav';
import NewPost from './newPost';
import BottomNav from './bottomNav';
import Feed from './feed';
import fire from 'firebase';
import { useDispatch } from 'react-redux';
import { userData, newPost } from '../actions/index';
import { useHistory } from 'react-router-dom';

function Main() {

  const [isLoading, setIsLoading] = useState(false);
  const [accountData, setAccountData] = useState({});
  const [sortBy, setSortBy] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const db = fire.firestore();
  const route = 'My Account'
  
  useEffect(() => {
    setIsLoading(true);
    dispatch(newPost([]));

    // dispatch account details to redux
    fire.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        db.collection('users').doc(user.email).get().then((res) => {
          try {
            dispatch(userData({email: user.email, username: res.data().username}));
            setAccountData({
              email: user.email,
              username: res.data().username
            });
          } catch {
            history.push('/');
            alert('Oops! Something went wrong! Please try to login again.');
          }
        });
      } else {
        history.push('/');
      }
    });

    
    // grab posts from global feed sorted by timestamp
    db.collection('posts').orderBy('timestamp').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        dispatch(newPost(doc.data()));
      });
      setIsLoading(false);
    });
    
    
  }, []);

  const mostLikedPostsHandler = () => {
    setSortBy(false);
    setIsLoading(true);
    db.collection('postVotes').where('vote', '==', 'liked').get().then((snapshot) => {
      let likedPostsArray = [];
      snapshot.forEach((doc) => {
        if(likedPostsArray[doc.data().postRef]) {
          likedPostsArray[doc.data().postRef].count++;
        } else {
          likedPostsArray[doc.data().postRef] = {postRef: doc.data().postRef, count: 1};
        }
      })
      likedPostsArray.sort((a, b) => b.count - a.count);
      // attempt to grab first 20 of the top liked
      let topLikedArray = [];
      for(let i = 0; i <= 20; i++) {
        db.collection('posts').doc(likedPostsArray[i].postRef).get().then((res) => {
          topLikedArray.push(res.data());
        });
      }
      dispatch(newPost(topLikedArray));
      
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  const mostRecentPostsHandler = () => {
    dispatch(newPost([]));
    setSortBy(true);
    setIsLoading(true);
    // grab posts from global feed sorted by timestamp
    db.collection('posts').orderBy('timestamp').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        dispatch(newPost(doc.data()));
      });
      setIsLoading(false);
    });
  }

  return (
    <div className="content-body">
      <div className="content">
        <Nav />
        <NewPost />
        <Feed isLoading={isLoading} />
      </div>
      <BottomNav
        accountData={accountData} 
        isLoading={isLoading} 
        route={route}
        sortBy={sortBy}
        mostLikedPostsHandler={mostLikedPostsHandler}
        mostRecentPostsHandler={mostRecentPostsHandler}
      />
    </div>
  );
}

export default Main;