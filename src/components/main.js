import React, { useEffect } from 'react';
import Nav from './nav';
import NewPost from './newPost';
import BottomNav from './bottomNav';
import Feed from './feed';
import fire from 'firebase';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userData, newPost } from '../actions/index';
import { useSelector } from 'react-redux';

function Main() {

  const location = useLocation();
  const dispatch = useDispatch();
  const db = fire.firestore();
  const username = useSelector(state => state.userData.username);
  const route = 'My Account'


  useEffect(() => {

    // grab posts from global feed
    db.collection('feedPosts').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        dispatch(newPost(doc.data()));
      });
    });


    if(username === '' || username === undefined) {
      db.collection('users').doc(location.state.email).get().then((res) => {
        const dataToStore = {
          email: location.state.email,
          username: res.data().username
        };
        dispatch(userData(dataToStore));
      })
    }
  }, []);

  return (
    <div>
      <Nav />
      <NewPost />
      <Feed />
      <BottomNav route={route}/>
    </div>
  );
}

export default Main;