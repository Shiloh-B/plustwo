import React, { useEffect } from 'react';
import Nav from './nav';
import NewPost from './newPost';
import BottomNav from './bottomNav';
import Feed from './feed';
import fire from 'firebase';
import { useDispatch } from 'react-redux';
import { userData, newPost } from '../actions/index';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Main() {

  const dispatch = useDispatch();
  const history = useHistory();
  const db = fire.firestore();
  const grabbedUserData = useSelector(state => state.userData);
  const route = 'My Account'


  useEffect(() => {

    // dispatch account details to redux
    fire.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        dispatch(userData({email: user.email, username: user.displayName}));
      } else {
        history.push('/');
      }
    });

    // grab posts from global feed sorted by timestamp
    db.collection('posts').orderBy('timestamp').limit(20).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        dispatch(newPost(doc.data()));
      });
    });
    

    
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