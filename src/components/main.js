import React, { useEffect } from 'react';
import Nav from './nav';
import NewPost from './newPost';
import Feed from './feed';
import fire from 'firebase';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userData, newPost } from '../actions/index';

function Main() {

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const db = fire.firestore();


  useEffect(() => {
    db.collection('users').doc(location.state.email).get().then((res) => {
      const dataToStore = {
        email: location.state.email,
        username: res.data().username
      };
      dispatch(userData(dataToStore));
    })
  }, []);

  const handleLogout = () => {
    fire.auth().signOut().then(() => {
      dispatch(userData({}));
      dispatch(newPost([]));
      history.push('/')
    });
  };

  return (
    <div>
      <Nav handleLogout={handleLogout} />
      <NewPost />
      <Feed />
    </div>
  );
}

export default Main;