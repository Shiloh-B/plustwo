import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../actions/index';
import { useHistory } from 'react-router-dom';
import Loading from '../components/loading';
import fire from '../fire';
import UserPost from './userPost';
import BottomNav from './bottomNav';
import Nav from './nav';

function AccountPage() {

  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentUserData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const db = fire.firestore();
  const history = useHistory();
  const route = 'Home';


  useEffect(() => {
    
    setIsLoading(true);
    // make sure we wait for the user auth callback to arrive
    fire.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        // dispatch account details to redux
        dispatch(userData({email: user.email, username: user.displayName}));

        // grab users posts
        db.collection('posts').where('email', '==', user.email).get().then((snapshot) => {
          if(!snapshot) {
            return;
          }
          let tempUserPosts = [];
          snapshot.forEach((doc) => {
            tempUserPosts.push(doc.data());
          });
          setUserPosts(tempUserPosts);
          setIsLoading(false);
        });
      } else {
        history.push('/');
      }
    });

    
  }, []);

  const userPostsToRender = userPosts.map((post, idx) => <UserPost post={post} key={idx}/>);

  return (
    <div className="content-body">
      <div className="content">
        <Nav />
        <h1 className="username-header">{currentUserData.username}</h1>
        <div className="user-post-container">
          <h2>{currentUserData.username}'s Posts</h2>
          <div>
            {
              isLoading ? <Loading /> : userPostsToRender
            }
          </div>
        </div>
      </div>
      <BottomNav route={route} />
    </div>
  );
}

export default AccountPage;