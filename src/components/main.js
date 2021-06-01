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

  const dispatch = useDispatch();
  const history = useHistory();
  const db = fire.firestore();
  const route = 'My Account'


  useEffect(() => {

    setIsLoading(true);

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
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="content-body">
      <div className="content">
        <Nav />
        <NewPost />
        <Feed isLoading={isLoading} />
      </div>
      <BottomNav isLoading={isLoading} route={route}/>
    </div>
  );
}

export default Main;