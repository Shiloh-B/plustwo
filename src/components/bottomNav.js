import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newPost } from '../actions/index';
import fire from '../fire';

function BottomNav({route}) {

  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector(state => state.userData.username);

  const routeHandler = () => {
    dispatch(newPost([]));
    if(route === 'My Account') {
      history.push({
        pathname: `/plustwo/${username}/${fire.auth().currentUser.uid}`,
        state: {
          email: fire.auth().currentUser.email,
          username: username
        }
      });
    } else if(route === "Home") {
      history.push({
        pathname: '/plustwo',
        state: {
          email: fire.auth().currentUser.email
        }
      });
    }
  }

  return (
    <div className="bottom-nav">
      <div className="account-button button" onClick={routeHandler}>{route}</div>
    </div>
  );
}

export default BottomNav;