import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newPost } from '../actions/index';
import fire from '../fire';

function BottomNav(props) {

  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector(state => state.userData.username);

  const routeHandler = () => {
    dispatch(newPost([]));
    if(props.route === 'My Account') {
      history.push({
        pathname: `/plustwo/${username}/${fire.auth().currentUser.uid}`,
        state: {
          email: fire.auth().currentUser.email,
          username: username,
          isLoading: props.isLoading
        }
      });
    } else if(props.route === "Home") {
      dispatch(newPost([]));
      history.push({
        pathname: '/plustwo',
        state: {
          email: fire.auth().currentUser.email
        }
      });
    }
  }

  const mostRecentPostsHandler = () => {
    props.mostRecentPostsHandler();
  }

  const mostLikedPostsHandler = () => {
    props.mostLikedPostsHandler();
  }

  if(props.route === 'My Account') {
    return (
    <div className="bottom-nav">
      <div className={props.sortBy ? "button-clicked" : "button"} onClick={mostRecentPostsHandler}>Recent Posts</div>
      <div className="account-button button" onClick={routeHandler}>{props.route}</div>
      <div className={props.sortBy ? "button" : "button-clicked"} onClick={mostLikedPostsHandler}>Most Liked Posts</div>
    </div>
    );
  }
  return (
    <div className="bottom-nav">
      <div className="account-button button" onClick={routeHandler}>{props.route}</div>
    </div>
  );
}

export default BottomNav;