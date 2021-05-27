import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import fire from '../fire';
import UserPost from './userPost';
import BottomNav from './bottomNav';
import Nav from './nav';

function AccountPage() {

  const [userPosts, setUserPosts] = useState([]);
  const db = fire.firestore();
  const location = useLocation();
  const route = 'Home';


  useEffect(() => {
    db.collection('users').doc(location.state.email).get().then((res) => {
      setUserPosts(res.data().posts);
    });
  }, []);

  const userPostsToRender = userPosts.map((post, idx) => <UserPost post={post} key={idx}/>);

  return (
    <div className="account-page">
      <Nav />
      <h1 className="username-header">{location.state.username}</h1>
      <div className="user-post-container">
        <h2>My Posts</h2>
        <div>
          {userPostsToRender}
        </div>
      </div>
      <BottomNav route={route} />
    </div>
  );
}

export default AccountPage;