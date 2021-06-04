import React, { useEffect, useState } from 'react';
import Nav from './nav';
import NewPost from './newPost';
import BottomNav from './bottomNav';
import Feed from './feed';
import fire from 'firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newPost } from '../actions/index';

function Main() {

  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(true);

  const dispatch = useDispatch();
  const db = fire.firestore();
  const route = 'My Account'
  const history = useHistory();
  
  useEffect(() => {
    setIsLoading(true);
    dispatch(newPost([]));

    // grab posts from global feed sorted by timestamp
    db.collection('posts').orderBy('timestamp').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        dispatch(newPost(doc.data()));
      });
      setIsLoading(false);
    });
    
    
  }, []);
  
  const mostLikedPostsHandler = () => {
    if(!sortBy) {
      return;
    }
    dispatch(newPost([]));
    setSortBy(false);
    setIsLoading(true);
    db.collection('posts').orderBy('score').get().then((snapshot) => {
      if(snapshot.empty) {
        return;
      }
      snapshot.forEach((doc) => {
        dispatch(newPost(doc.data()));
      });
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
      history.push('/oops');
    });
  }

  const mostRecentPostsHandler = () => {
    if(sortBy) {
      return;
    }
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