import React from 'react';
import fire from '../fire';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../actions/index';



function Nav() {

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    fire.auth().signOut().then(() => {
      dispatch(userLogout());
      history.push('/')
    });
  };

  const homeRouteHandler = () => {
    history.push({
      pathname: '/plustwo',
      state: {
        email: fire.auth().currentUser.email
      }
    });
  }

  return (
    <div className='nav-bar'>
      <div>

      </div>
      <div>
        <h1 className="plus-two-header" onClick={homeRouteHandler}>Plus <span>Two</span></h1>
      </div>
      <div className="grid-column">
        <div className="button logout" onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
}

export default Nav;