import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userData } from '../actions/index';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../components/loading';
import fire from '../fire';
import UserPost from './userPost';
import BottomNav from './bottomNav';
import Nav from './nav';

function AccountPage() {

  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accountUsername, setAccountUsername] = useState('');
  const dispatch = useDispatch();
  const db = fire.firestore();
  const history = useHistory();
  const route = 'Home';
  const { uid } = useParams();


  useEffect(() => {
    setIsLoading(true);
    // make sure we wait for the user auth callback to arrive
    fire.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        // dispatch account details to redux
        dispatch(userData({email: user.email, username: user.displayName}));

        // grab users posts
        db.collection('posts').where('uid', '==', uid).orderBy('timestamp', 'desc').get().then((snapshot) => {
          if(snapshot.empty) {
            // make a check that the user exists at all or if they just don't have posts
            db.collection('users').where('uid', '==', uid).get().then((snapshot) => {
              if(snapshot.empty) {
                // at this point we know the user doesn't exist so point them to 404
                history.push('/oops');
                return;
              }
              // at this point we know the user exists but hasn't made any posts so we set the username and bounce
              snapshot.forEach((doc) => {
                setAccountUsername(doc.data().username);
              });
            });
          }
          let tempUserPosts = [];
          snapshot.forEach((doc) => {
            tempUserPosts.push(doc.data());
            setAccountUsername(doc.data().username);
          });
          setUserPosts(tempUserPosts);
          setIsLoading(false);
        }).catch((err) => {
          history.push('/oops');
        });
      } else {
        history.push('/oops');
      }
    });

    
  }, [db, dispatch, history, uid]);

  const userPostsToRender = userPosts.map((post, idx) => <UserPost post={post} key={idx}/>);
  return (
    <div className="content-body">
      <div className="content">
        <Nav />
        <h1 className="username-header">{accountUsername}</h1>
        <div className="feed-container">
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