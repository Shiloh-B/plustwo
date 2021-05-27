import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import fire from '../fire';

function BottomNav({route}) {

  const history = useHistory();
  const username = useSelector(state => state.userData.username);
  const [uid, setUid] = useState('');

  useEffect(() => {
    if(fire.auth().currentUser) {
      setUid(fire.auth().currentUser.uid);
    }
  }, []);

  const routeHandler = () => {
    if(route === 'My Account') {
      history.push({
        pathname: `/plustwo/${username}/${uid}`,
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